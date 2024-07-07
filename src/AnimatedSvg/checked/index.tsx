import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

const startPath = `M7.6631 11.5586C7.6631 11.5586 7.6631 11.5586 7.6631 11.5586L7.6631 11.5586 7.6631 11.5586 7.6631 11.5586C7.6631 11.5586 7.6631 11.5586 7.6631 11.5586L7.6631 11.5586 7.6631 11.5586C7.6631 11.5586 7.6631 11.5586 7.6631 11.5586 7.6631 11.5586 7.6631 11.5586 7.6631 11.5586L7.6631 11.5586 7.6631 11.5586 7.6631 11.5586C7.6631 11.5586 7.6631 11.5586 7.6631 11.5586Z`;
const centerPath = `M10.346 15.01C10.346 15.01 10.346 15.01 10.346 15.01L10.346 15.01 10.346 15.01 10.346 15.01C10.271 15.035 10.048 15.035 9.9044 14.8532L9.8161 14.7722 7.6631 12.6192C7.3702 12.3263 7.3702 11.8515 7.6631 11.5586 7.9293 11.2923 8.346 11.2681 8.6396 11.486L8.7237 11.5586 10.346 13.1807 10.346 13.1807C10.346 13.1807 10.346 13.1807 10.346 14.072Z`;
const endPath = `M15.7657 8.8226C16.032 9.0888 16.0562 9.5055 15.8383 9.7991L15.7657 9.8832 11.002 14.6457 10.9671 14.6986C10.7335 15.0078 10.2814 15.1572 9.9044 14.8532L9.8161 14.7722 7.6631 12.6192C7.3702 12.3263 7.3702 11.8515 7.6631 11.5586 7.9293 11.2923 8.346 11.2681 8.6396 11.486L8.7237 11.5586 10.346 13.1807 14.7051 8.8226C14.998 8.5297 15.4728 8.5297 15.7657 8.8226Z`;

export interface CheckedProps extends React.SVGProps<SVGSVGElement> {
  checked?: boolean;
}

export const Checked: React.FC<CheckedProps> = ({ checked = false, ...rest }) => {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;
    const path = d3.select(pathRef.current);

    if (checked) {
      path.transition().duration(60).attr('d', centerPath).transition().duration(100).attr('d', endPath);
    } else {
      path.transition().duration(100).attr('d', centerPath).transition().duration(60).attr('d', startPath);
    }
  }, [checked]);

  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" {...rest}>
      <path ref={pathRef} fill="currentColor" stroke="none" />
    </svg>
  );
};
