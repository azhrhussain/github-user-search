import React from 'react';
const LazyComponents:any = {};
const Components = [
  'Search',
  'Repository',
  'RepositoryDetail',
  'NotFound'
];

Components.forEach(name => {
	LazyComponents[name] = React.lazy(() => import(`./../modules/${name}`));
});

export default LazyComponents;
