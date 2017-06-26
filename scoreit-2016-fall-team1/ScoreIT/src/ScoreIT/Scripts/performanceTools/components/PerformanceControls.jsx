import React from 'react';
import Perf from 'react-addons-perf';

function PerformanceControls({ children }) {
    const style = {
        top: 0,
        left: 0,
        position: 'fixed',
        zIndex: 99
    };

    function start() {
        Perf.start();
    }

    function stop() {
        Perf.stop();
        const measurements = Perf.getLastMeasurements();
        Perf.printInclusive(measurements);
    }

    return (
        <div>
            <div style={style}>
                <button className="button inline" onClick={start}>Start</button>
                <button className="button inline" onClick={stop}>Stop</button>
            </div>
            {children}
        </div>
    );
}

PerformanceControls.propTypes = {
    children: React.PropTypes.node.isRequired
};

export default PerformanceControls;
