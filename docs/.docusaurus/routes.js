import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'df7'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '12c'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '90f'),
            routes: [
              {
                path: '/docs/architecture/api-integration',
                component: ComponentCreator('/docs/architecture/api-integration', 'f15'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/overview',
                component: ComponentCreator('/docs/architecture/overview', '304'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/architecture/state-management',
                component: ComponentCreator('/docs/architecture/state-management', '39c'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/challenges/solutions',
                component: ComponentCreator('/docs/challenges/solutions', 'd4d'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/components/component-overview',
                component: ComponentCreator('/docs/components/component-overview', '46e'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', 'a6e'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/setup/configuration',
                component: ComponentCreator('/docs/setup/configuration', 'f7a'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/setup/installation',
                component: ComponentCreator('/docs/setup/installation', '6b7'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/setup/prerequisites',
                component: ComponentCreator('/docs/setup/prerequisites', '50b'),
                exact: true,
                sidebar: "docs"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
