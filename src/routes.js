import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const AccountLogin = React.lazy(() => import('./views/account/login/Login'));
const AccountProfile = React.lazy(() => import('./views/account/profile/Profile'));

const LocationsListing = React.lazy(() => import('./views/location/LocationsListing'));
const LocationCreate = React.lazy(() => import('./views/location/LocationCreate'));
const LocationEdit = React.lazy(() => import('./views/location/LocationEdit'));

const ProductsListing = React.lazy(() => import('./views/product/ProductsListing'));
const ProductCreate = React.lazy(() => import('./views/product/ProductCreate'));
const ProductEdit = React.lazy(() => import('./views/product/ProductEdit'));

const ProductCategoriesListing = React.lazy(() => import('./views/productCategory/ProductCategoriesListing'));
const ProductCategoryCreate = React.lazy(() => import('./views/productCategory/ProductCategoryCreate'));
const ProductCategoryEdit = React.lazy(() => import('./views/productCategory/ProductCategoryEdit'));

const MenusListing = React.lazy(() => import('./views/menu/MenuListing'));
const MenuCreate = React.lazy(() => import('./views/menu/MenuCreate'));
const MenuEdit = React.lazy(() => import('./views/menu/MenuEdit'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/account/login', exact: true, name: 'Login', component: AccountLogin },
  { path: '/account/profile', exact: true, name: 'Profile', component: AccountProfile },

  { path: '/locations', name: 'Locations', component: LocationsListing },
  { path: '/location/create', name: 'Create Location', component: LocationCreate },
  { path: '/location/edit/:id?', name: 'Edit Location', component: LocationEdit },

  { path: '/products', name: 'Products', component: ProductsListing },
  { path: '/product/create', name: 'Create Product', component: ProductCreate },
  { path: '/product/edit/:id?', name: 'Edit Product', component: ProductEdit },

  { path: '/productcategories', name: 'Product Categories', component: ProductCategoriesListing },
  { path: '/productcategory/create', name: 'Create Product Category', component: ProductCategoryCreate },
  { path: '/productcategory/edit/:id?', name: 'Edit Product Category', component: ProductCategoryEdit },

  { path: '/menus', name: 'Menus', component: MenusListing },
  { path: '/menu/create', name: 'Create Menu', component: MenuCreate },
  { path: '/menu/edit/:id?', name: 'Edit Menu', component: MenuEdit },
]

export default routes;
