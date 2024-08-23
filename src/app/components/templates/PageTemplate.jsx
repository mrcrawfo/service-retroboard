import get from 'lodash/get';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Outlet, useMatches } from 'react-router-dom';

import HorizontalStack from '../atoms/HorizontalStack';
import ImgIcon from '../atoms/ImgIcon';
import { HEADERS } from '../../style/theme';
import { rmnPages } from '../../constants/siteSettings';

// ** If height is updated, please also update pxOfNavAndHeader constant **
const PageTemplate = () => {
    const matches = useMatches();
    const crumbs = matches
        .filter((match) => Boolean(match.handle?.crumb))
        .map((match) => ({
            key: match.handle.crumb,
            url: `${match.pathname}/`,
        }));

    const lastCrumbIndex = crumbs.length - 1;
    const lastCrumb = crumbs[lastCrumbIndex];
    const logo = get(rmnPages[lastCrumb.key], 'logo', null);

    return (
        <>
            <Breadcrumbs separator='›' aria-label='breadcrumbs' sx={{ mb: 1 }}>
                {crumbs.map(({ key, url }, index) => {
                    const crumbTitle = get(rmnPages[key], 'breadcrumb', get(rmnPages[key], 'header', 'error page'));
                    return index === lastCrumbIndex ? (
                        <Typography variant='caption' key={key}>
                            {crumbTitle}
                        </Typography>
                    ) : (
                        <Link variant='caption' underline='hover' key={key} href={url}>
                            {crumbTitle}
                        </Link>
                    );
                })}
            </Breadcrumbs>
            <HorizontalStack alignItems='flex-end' sx={{ height: '42px', mt: 2, mb: 4 }}>
                {logo && <ImgIcon alt={logo.alt} src={logo.src} />}
                <Typography variant={HEADERS.pageHeader} sx={{ fontSize: 36 }}>
                    {rmnPages[crumbs[lastCrumbIndex].key]?.header || 'Error Page'}
                </Typography>
            </HorizontalStack>
            <Outlet />
        </>
    );
};

export default PageTemplate;
