import { useSize } from 'ahooks';
import React, { useEffect, useRef, useState } from 'react';
import './index.less';

export interface ImageViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  selectClassName: string;
  viewClassName: string;
  className?: string;
  imgClassName?: string;
  alt?: string;
  wheelZoom?: boolean;
}

const clear = (e: Event) => e.preventDefault();
export const ImageViewer: React.FC<ImageViewerProps> = ({
  src,
  alt = 'one image',
  className = '',
  selectClassName = '',
  viewClassName = '',
  imgClassName = '',
  wheelZoom = false,
  onClick,
  ...rest
}) => {
  const [isshow, setIsshow] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const maskViewRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const selectSizeStyle = useSize(maskViewRef) || {
    width: 1,
    height: 1,
  };
  const baseSizeStyle = useSize(imgRef) || {
    width: 0,
    height: 0,
  };
  const viewSizeStyle = useSize(viewRef) || {
    width: 1,
    height: 1,
  };
  const baseSelectSizeRef = useRef<{ width: number; height: number } | null>(null);
  useEffect(() => {
    if (selectSizeStyle.width === 1) {
      return;
    }
    if (baseSelectSizeRef.current) {
      return;
    }
    baseSelectSizeRef.current = selectSizeStyle;
  }, [selectSizeStyle]);

  const viewScaleHeight = viewSizeStyle.height / selectSizeStyle.height;
  const viewScaleWidth = viewSizeStyle.width / selectSizeStyle.width;

  const showFn = () => {
    setIsshow(true);
    document.addEventListener('wheel', clear, { passive: false });
  };
  const hideFn = () => {
    setIsshow(false);
    document.removeEventListener('wheel', clear);
    if (maskViewRef.current && baseSelectSizeRef.current) {
      maskViewRef.current.style.width = `${baseSelectSizeRef.current.width}px`;
      maskViewRef.current.style.height = `${baseSelectSizeRef.current.height}px`;
    }
  };
  const moveFn = (pageX: number, pageY: number) => {
    if (!maskRef.current) return;
    if (!maskViewRef.current) return;
    if (!imgRef.current) return;
    if (!viewRef.current) return;

    const mask = maskRef.current;
    const container = imgRef.current;
    const { width: maskW, height: maskH } = mask.getBoundingClientRect();

    const width = selectSizeStyle.width;
    const height = selectSizeStyle.height;
    const left = pageX - container.offsetLeft - width / 2;
    const top = pageY - container.offsetTop - height / 2;

    const newLeft = left < 0 ? 0 : left > maskW - width ? maskW - width : left;
    const newTop = top < 0 ? 0 : top > maskH - height ? maskH - height : top;

    const maskView = maskViewRef.current;
    maskView.style.left = `${newLeft}px`;
    maskView.style.top = `${newTop}px`;

    const view = viewRef.current;
    view.style.backgroundPosition = `-${newLeft * viewScaleWidth}px -${newTop * viewScaleHeight}px`;
  };

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const { pageX, pageY } = e;
    moveFn(pageX, pageY);
  };

  const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    const { pageX, pageY } = e.touches[0];
    moveFn(pageX, pageY);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    if (!wheelZoom) return;
    e.preventDefault();
    e.stopPropagation();
    if (!maskViewRef.current) return;
    if (!imgRef.current) return;
    if (!viewRef.current) return;
    const maskView = maskViewRef.current;
    const { width: maskViewW, height: maskViewH } = maskView.getBoundingClientRect();
    const { clientX, clientY } = e;
    const { left: containerLeft, top: containerTop } = imgRef.current.getBoundingClientRect();
    const newWidth = e.deltaY > 0 ? maskViewW * 0.9 : maskViewW * 1.1;
    const newHeight = e.deltaY > 0 ? maskViewH * 0.9 : maskViewH * 1.1;
    if (newWidth < 10 || newHeight < 10) return;
    if (newWidth > baseSizeStyle.width || newHeight > baseSizeStyle.height) return;

    const newLeft = clientX - containerLeft - newWidth / 2;
    const newTop = clientY - containerTop - newHeight / 2;
    // console.log('mask', { maskViewW, maskViewH, pageX, pageY, newLeft, newTop, clientX, clientY });
    maskView.style.width = `${newWidth}px`;
    maskView.style.height = `${newHeight}px`;
    maskView.style.left = `${newLeft}px`;
    maskView.style.top = `${newTop}px`;

    const view = viewRef.current;
    view.style.backgroundPosition = `-${newLeft * viewScaleWidth}px -${newTop * viewScaleHeight}px`;

    const newViewScaleHeight = viewSizeStyle.height / newHeight;
    const newViewScaleWidth = viewSizeStyle.width / newWidth;
    view.style.backgroundSize = `${baseSizeStyle.width * newViewScaleWidth}px ${
      baseSizeStyle.height * newViewScaleHeight
    }px`;
  };

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    onClick?.(e);
  };

  useEffect(() => {
    if (!maskViewRef.current) return;
    const maskView = maskViewRef.current;
    maskView.addEventListener('wheel', handleWheel as any, {
      passive: false,
    });
    return () => {
      maskView.removeEventListener('wheel', handleWheel as any);
    };
  }, [handleWheel]);

  return (
    <div
      className={`magic-image-viewer ${className}`}
      onMouseEnter={showFn}
      onMouseLeave={hideFn}
      onTouchStart={showFn}
      onTouchEnd={hideFn}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onClick={handleClick}
      onKeyDown={handleClick as any}
      ref={imgRef}
      {...rest}
    >
      <img src={src} alt={alt} width={baseSizeStyle.width} height={baseSizeStyle.height} className={imgClassName} />
      <div className="magic-image-viewer__mask" ref={maskRef}>
        <div
          className={`magic-image-viewer__mask-view ${
            isshow ? 'magic-image-viewer__mask-view__show' : ''
          } ${selectClassName}`}
          ref={maskViewRef}
        />
      </div>
      <div
        className={`magic-image-viewer__view ${viewClassName}`}
        style={{
          backgroundImage: `url(${src})`,
          display: isshow ? 'block' : 'none',
          backgroundSize: `${baseSizeStyle.width * viewScaleWidth}px ${baseSizeStyle.height * viewScaleHeight}px`,
        }}
        ref={viewRef}
        onTouchStart={hideFn}
        onMouseEnter={hideFn}
      />
    </div>
  );
};
