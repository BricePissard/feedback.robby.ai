import React from 'react'
import PropTypes from 'prop-types'
import Highcharts from 'highcharts'
import HighchartsReact from 'react-highcharts'

var config = {
  chart: {
    type: 'pie',
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    options3d: {
      enabled: true,
      alpha: 45
    }
  },
  title: {
    text: 'Feedbacks Stats'
  },
  subtitle: {
    text: 'Display the number of stars left'
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  plotOptions: {
    pie: {
      innerSize: 100,
      depth: 45,
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>', //': {point.percentage:.1f} %',
        style: {
          color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
        }
      }
    }
  },
  series: [{
    name: 'Feedbacks',
    colorByPoint: true,
    data: []
  }]
}

/**
 * @see https://github.com/highcharts/highcharts-react
 * @exports {Div}
 */
const FeedbackGraph = ({ feedbacks }) => {
  let data = [0,0,0,0,0,0]
  feedbacks.map(f => data[f.rating]=++data[f.rating])
  config.series[0].data = [
    ['★', data[1]],
    ['★★', data[2]],
    ['★★★', data[3]],
    ['★★★★', data[4]],
    ['★★★★★', data[5]]
  ]
  return (
    <div className="feedbackGraph">
      {feedbacks.length > 0 ? 
				<HighchartsReact config={config} /> : <h5>No stats</h5>
			}
    </div>
  )
}

FeedbackGraph.propTypes = {
  feedbacks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      names: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      comment: PropTypes.string.isRequired,
      date: PropTypes.string
    }).isRequired
  ).isRequired
}

export default FeedbackGraph
