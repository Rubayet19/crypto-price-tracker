import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Web App',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        A Next.js web application that displays live cryptocurrency prices
        with search functionality and manual refresh.
      </>
    ),
  },
  {
    title: 'API Integration',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Integration with public cryptocurrency APIs to fetch and display
        real-time price data.
      </>
    ),
  },
  {
    title: 'State Management',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Efficient state management using React Context API to handle
        application state and data flow.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}