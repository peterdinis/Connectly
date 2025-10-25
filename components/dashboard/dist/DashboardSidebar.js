'use client';
'use strict';
exports.__esModule = true;
exports.DashboardSidebar = void 0;
var utils_1 = require('@/lib/utils');
var button_1 = require('@/components/ui/button');
var lucide_react_1 = require('lucide-react');
var link_1 = require('next/link');
var navigation_1 = require('next/navigation');
var framer_motion_1 = require('framer-motion');
var ModeToggle_1 = require('../shared/ModeToggle');
var kinde_auth_nextjs_1 = require('@kinde-oss/kinde-auth-nextjs');
var kinde_auth_nextjs_2 = require('@kinde-oss/kinde-auth-nextjs');
var navigation = [
    { name: 'Overview', href: '/dashboard', icon: lucide_react_1.Home },
    { name: 'Links', href: '/dashboard/links', icon: lucide_react_1.LinkIcon },
    { name: 'Design', href: '/dashboard/design', icon: lucide_react_1.Palette },
    { name: 'Analytics', href: '/dashboard/analytics', icon: lucide_react_1.BarChart3 },
];
function DashboardSidebar() {
    var pathname = navigation_1.usePathname();
    var router = navigation_1.useRouter();
    var user = kinde_auth_nextjs_1.useKindeBrowserClient().user;
    return React.createElement(
        framer_motion_1.motion.div,
        {
            initial: { x: -20, opacity: 0 },
            animate: { x: 0, opacity: 1 },
            transition: { duration: 0.3 },
            className: 'flex h-full w-64 flex-col border-r bg-card',
        },
        React.createElement(
            'div',
            { className: 'flex h-16 items-center justify-between border-b px-6' },
            React.createElement(
                framer_motion_1.motion.h1,
                {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { delay: 0.2 },
                    className: 'text-xl font-bold',
                },
                'Dashboard',
            ),
            React.createElement(ModeToggle_1.ModeToggle, null),
        ),
        React.createElement(
            framer_motion_1.motion.div,
            {
                initial: { opacity: 0, y: -10 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.3 },
                className: 'px-6 py-4 border-b',
            },
            React.createElement(
                'p',
                { className: 'text-sm font-medium' },
                user === null || user === void 0 ? void 0 : user.email,
            ),
        ),
        React.createElement(
            'nav',
            { className: 'flex-1 space-y-1 px-3 py-4' },
            navigation.map(function (item, index) {
                var isActive = pathname === item.href;
                return React.createElement(
                    framer_motion_1.motion.div,
                    {
                        key: item.name,
                        initial: { opacity: 0, x: -20 },
                        animate: { opacity: 1, x: 0 },
                        transition: { delay: 0.4 + index * 0.05 },
                        whileHover: { x: 4 },
                        whileTap: { scale: 0.98 },
                    },
                    React.createElement(
                        link_1['default'],
                        { href: item.href },
                        React.createElement(
                            button_1.Button,
                            {
                                variant: isActive ? 'secondary' : 'ghost',
                                className: utils_1.cn(
                                    'w-full justify-start gap-3 transition-all',
                                    isActive && 'bg-secondary',
                                ),
                            },
                            React.createElement(item.icon, { className: 'h-5 w-5' }),
                            item.name,
                        ),
                    ),
                );
            }),
        ),
        React.createElement(
            'div',
            { className: 'border-t p-3 space-y-1' },
            React.createElement(
                framer_motion_1.motion.div,
                { whileHover: { x: 4 }, whileTap: { scale: 0.98 } },
                React.createElement(
                    button_1.Button,
                    {
                        variant: 'ghost',
                        className: 'w-full justify-start gap-3',
                        onClick: function () {
                            return router.push('/dashboard/profile');
                        },
                    },
                    React.createElement(lucide_react_1.Eye, { className: 'h-5 w-5' }),
                    'Preview Page',
                ),
            ),
            React.createElement(
                framer_motion_1.motion.div,
                { whileHover: { x: 4 }, whileTap: { scale: 0.98 } },
                React.createElement(
                    button_1.Button,
                    {
                        variant: 'ghost',
                        className:
                            'w-full justify-start gap-3 text-destructive hover:text-destructive',
                    },
                    React.createElement(
                        kinde_auth_nextjs_2.LogoutLink,
                        null,
                        React.createElement(lucide_react_1.LogOut, { className: 'h-5 w-5' }),
                        'Log out',
                    ),
                ),
            ),
        ),
    );
}
exports.DashboardSidebar = DashboardSidebar;
