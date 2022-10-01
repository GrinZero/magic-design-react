import React, { useEffect, useMemo, useRef } from 'react';

import type { ComponentProps } from '@/types';

import * as d3 from 'd3';

export interface ListNodeType<T> {
  val: T;
  next: null | ListNodeType<T>;
}

export interface LinkedListProps<T> extends ComponentProps {
  head: ListNodeType<T>;
}

const getList = <T,>(head: ListNodeType<T>) => {
  let current: typeof head | null = head;
  const list = [];
  do {
    list.push(current);
    current = current.next;
  } while (current !== head && current);
  return list;
};

interface TreeNode<T> {
  name: T;
  children?: TreeNode<T>[];
  val?: T;
}

const getTree = <T,>(head: ListNodeType<T>) => {
  const list = getList(head);
  const root: TreeNode<T> = {
    name: head.val,
    children: void 0,
    val: head.val,
  };
  let current = root;
  list.forEach((item, index) => {
    if (index === 0) {
      return;
    }
    const node: TreeNode<T> = {
      name: item.val,
      children: void 0,
      val: item.val,
    };
    current.children = [node];
    current = node;
  });
  return root;
};

const LinkedList = <T,>({ head }: LinkedListProps<T>): React.ReactElement => {
  const rList = useMemo(() => getList(head), [head]);
  // #region 抽成复用hook
  // #endregion 抽成复用hook
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) {
      const { clientWidth: width, clientHeight: height } = containerRef.current;
      const containHeight = height + 200;
      const margin = { top: 30, right: 120, bottom: 10, left: 40 };

      const svg = d3.select(containerRef.current).append('svg').attr('width', width).attr('height', containHeight);

      const data = getTree(head);

      const root = d3.hierarchy(data);

      const tree = d3.treemap().size([width, containHeight]).padding(2);
      tree(root);

      svg
        .append('g')
        .selectAll('line')
        .data(root.links())
        .enter()
        .append('path')
        .attr('fill', 'none')
        .attr('stroke', '#ccc')
        .attr(
          'd',
          d3
            .linkVertical<TreeNode<T>, { x0: number }>()
            .x((d) => d.x0 * 30 + 50)
            .y(() => margin.top) as any,
        );

      svg
        .append('g')
        .selectAll('circle')
        .data(root.descendants())
        .join('circle')
        .attr('cx', (d: any) => d.x0 * 30 + 30)
        .attr('cy', () => margin.top)
        .attr('r', 20)
        .attr('fill', '#fff')
        .attr('stroke', '#ccc')
        .attr('stroke-width', 2);

      svg
        .append('g')
        .selectAll('text')
        .data(root.descendants())
        .join('text')
        .attr('x', (d: any) => d.x0 * 30 + 30)
        .attr('y', () => margin.top)
        .attr('dy', '0.32em')
        .attr('text-anchor', 'middle')
        .text((d: any) => d.data.name);
    }
  });
  return (
    <div className="mg-flex mg-w-full mg-relative">
      <div className="mg-flex mg-w-full mg-relative" ref={containerRef} />
    </div>
  );
};

export default LinkedList;
