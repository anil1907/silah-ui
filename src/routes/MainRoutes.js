import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const BrandsPage = Loadable(lazy(() => import('views/brands')));
const ModelsPage = Loadable(lazy(() => import('views/models')));
const ProductPage = Loadable(lazy(() => import('views/products')));
const CategoriesPage = Loadable(lazy(() => import('views/categories')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/',
            element: <SamplePage />
        },
        {
            path: '/sample-page',
            element: <SamplePage />
        },
        {
            path: '/brand-page',
            element: <BrandsPage />
        },
        {
            path: '/model-page',
            element: <ModelsPage />
        },
        {
            path: '/category-page',
            element: <CategoriesPage />
        },
        {
            path: '/product-page',
            element: <ProductPage />
        }
    ]
};

export default MainRoutes;
