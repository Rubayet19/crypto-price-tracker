/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Setup',
      items: [
        'setup/prerequisites',
        'setup/installation',
        'setup/configuration',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'architecture/overview',
        'architecture/api-integration',
        'architecture/state-management',
      ],
    },
    {
      type: 'category',
      label: 'Components',
      items: [
        'components/component-overview',
      ],
    },
    {
      type: 'category',
      label: 'Challenges',
      items: [
        'challenges/solutions',
      ],
    },
  ],
};

module.exports = sidebars;