'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import config from '../config';
import { sortBy } from 'lodash';
import { formatThousands } from '../utils/format';
import { openDownloadModal } from '../actions/action-creators';

var CountriesHub = React.createClass({
  displayName: 'CountriesHub',

  propTypes: {
    _openDownloadModal: React.PropTypes.func,
    countries: React.PropTypes.array
  },

  onDownloadClick: function (country, e) {
    e.preventDefault();
    this.props._openDownloadModal({country: country});
  },

  renderCountryList: function () {
    return sortBy(this.props.countries, 'name').map(o => (
      <article className='card card--data-compact' key={o.code}>
        <div className='card__contents'>
          <header className='card__header'>
            <h1 className='card__title'><Link to={`/countries/${o.code}`} title={`View ${o.name} page`}>{o.name}</Link></h1>
          </header>
          <div className='card__body'>
            <ul className='card__meta-details'>
              <li>Measurements: {formatThousands(o.count)}</li>
              <li>Locations: {formatThousands(o.locations)}</li>
            </ul>
          </div>
          <footer className='card__footer'>
            <ul className='card__actions'>
              <li><a href='#' className='button-card-download' title={`Download data for ${o.name}`} onClick={this.onDownloadClick.bind(null, o.code)}>Download</a></li>
              <li><Link to={`/countries/${o.code}`} className='button-card-view' title={`View ${o.name} page`}>View More</Link></li>
            </ul>
          </footer>
        </div>
      </article>
    ));
  },

  render: function () {
    return (
      <section className='inpage'>
        <header className='inpage__header'>
          <div className='inner'>
            <div className='inpage__headline'>
              <h1 className='inpage__title'>Browse by Country</h1>
            </div>
            <div className='inpage__introduction'>
              <p>We’re currently collecting data in {this.props.countries.length} different countries and always seeking to add more. We aggregate PM2.5, PM10, ozone (O3), sulfur dioxide (SO2), nitrogen dioxide (NO2), carbon monoxide (CO), and black carbon (BC) from real-time government and research grade sources. If you can’t find the location you’re looking for please <a href='https://docs.google.com/forms/d/1Osi0hQN1-2aq8VGrAR337eYvwLCO5VhCa3nC_IK2_No/viewform' title='Suggest a new source'>suggest a source</a> of <a href='mailto:info@openaq.org' title='Contact openaq'>send us an email</a>.</p>
              <small className='disclaimer'><a href='https://medium.com/@openaq/where-does-openaq-data-come-from-a5cf9f3a5c85'>Data Disclaimer and More Information</a></small>
            </div>
            <div className='inpage__actions'>
              <ul>
                <li><a href={config.apiDocs} title='View API documentation' className='button-inpage-api' target='_blank'>View API Docs</a></li>
              </ul>
            </div>
          </div>
        </header>
        <div className='inpage__body'>

          <div className='fold' id='countries-list'>
            <div className='inner'>
              <div className='fold__body'>
                <div className='countries-list'>
                  {this.renderCountryList()}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    );
  }
});

// /////////////////////////////////////////////////////////////////// //
// Connect functions

function selector (state) {
  return {
    countries: state.baseData.data.countries
  };
}

function dispatcher (dispatch) {
  return {
    _openDownloadModal: (...args) => dispatch(openDownloadModal(...args))
  };
}

module.exports = connect(selector, dispatcher)(CountriesHub);
