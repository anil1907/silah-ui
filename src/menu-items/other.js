// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconBrandChrome, IconHelp, IconSitemap } from '@tabler/icons';

// constant
const icons = {
    IconBrandChrome,
    IconHelp,
    IconSitemap
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'brand-page',
            title: <FormattedMessage id="brand-page" />,
            type: 'item',
            url: '/brand-page',
            icon: icons.IconBrandChrome,
            breadcrumbs: true
        },
        {
            id: 'model-page',
            title: <FormattedMessage id="model-page" />,
            type: 'item',
            url: '/model-page',
            icon: icons.IconBrandChrome,
            breadcrumbs: true
        },
        {
            id: 'category-page',
            title: <FormattedMessage id="category-page" />,
            type: 'item',
            url: '/category-page',
            icon: icons.IconBrandChrome,
            breadcrumbs: true
        }
    ]
};

export default other;
