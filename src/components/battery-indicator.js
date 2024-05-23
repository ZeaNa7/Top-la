import React, { useState, useEffect } from 'react';
import { getBatteryIcon } from '../utils/battery.utils';

const BatteryIndicator = () => {
  const [batteryLevel, setBatteryLevel] = useState(null);

  useEffect(() => {
    if ('getBattery' in navigator) {
      navigator.getBattery().then((battery) => {
        const updateBatteryLevel = () => {
          setBatteryLevel(Math.floor(battery.level * 100));
        };

        updateBatteryLevel();
        battery.addEventListener('levelchange', updateBatteryLevel);
      });
    }
  }, []);

  return <div className="flex items-center">{batteryLevel !== null ? <span className="mr-2">{getBatteryIcon(batteryLevel)} {batteryLevel}%</span> : <span>Indisponible</span>}</div>;
};

export default BatteryIndicator;
