import React from 'react';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import Battery80Icon from '@mui/icons-material/Battery80';
import Battery50Icon from '@mui/icons-material/Battery50';
import Battery30Icon from '@mui/icons-material/Battery30';
import Battery20Icon from '@mui/icons-material/Battery20';

export function getBatteryIcon(battery) {
        switch (true) {
            case battery === 100:
                return <BatteryFullIcon />;
            case battery > 80:
                return <Battery80Icon />;
            case battery > 50:
                return <Battery50Icon />;
            case battery > 30:
                return <Battery30Icon />;
            default:
                return <Battery20Icon />;
        }
}
