import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'SWE-agent\nGPT-4',
    Resolved: 12.47,
  },
  {
    name: 'RAG\nClaude 3 Opus',
    Resolved: 3.79,
  },
  {
    name: 'RAG\nClaude 2',
    Resolved: 1.96,
  },
  {
    name: 'RAG\nGPT-4',
    Resolved: 1.31,
  },
];

const CustomXAxisTick = ({ x, y, payload }) => {
  const lines = payload.value.split('\n');
  if (payload && payload.value) {
    return (
      <text
          fontSize={"16px"}
          width={120}
          x={x}
          y={y}
          textAnchor="middle"
      >
        {lines.map((line, index) => (
          <tspan x={x} dy={index > 0 ? '1.2em' : '0.7em'} key={index}>{line}</tspan>
        ))}
      </text>
    );
  }
  return null;
};

export default class ResultsChart extends PureComponent {
  render() {
    return (
        <div style={{ width: '90%', height: '30vh', margin: '0 auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: '0.5em 0' }}>SWE-bench Performance</h3>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                <XAxis interval={0} tick={<CustomXAxisTick/>} dataKey="name" height={70} />
                <YAxis
                  tickFormatter={(value) => `${value}%`}
                  domain={[0, 'dataMax + 0.53']}
                  label={{ 
                    value: '% Resolved', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle' } 
                  }}
                />
                <Bar dataKey="Resolved" fill="#8884d8" barSize={50} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
  }
}
