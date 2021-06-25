
interface RouteMapItem {
  path: string,
  exact?: boolean,
  component: string,
}

const RouteMap:Array<RouteMapItem> = [
  { 
    path: '/user/:userId/repos/:repositoryId', 
    exact: true,
    component: 'RepositoryDetail'
  },
  { 
    path: '/user/:userId', 
    exact: true,
    component: 'Repository' 
  },
  { 
    path: '/', 
    exact: true, 
    component: 'Search' 
  },
  { path:'',
    component: 'NotFound' 
  },
];

export default RouteMap;