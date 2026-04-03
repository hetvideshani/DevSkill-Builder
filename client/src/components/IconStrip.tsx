// src/components/IconStrip.tsx

import React from 'react';
import { color, motion } from 'framer-motion';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faReact, faFacebook, faTwitter, faAngular,
    faGoogleDrive,
    faPython,
    faJava,
    faLinux,
    faWindows,
    faUbuntu,
    faGithub,
    faCodepen,
    faSkype,
    faUnity,
    faNodeJs,
    faLinkedin,
    faChrome,
    faBootstrap,
    faYoutube,
    faCss3Alt
 } from '@fortawesome/free-brands-svg-icons';
import {
    faDatabase,
    faCode,
    faLaptopCode,
    
} from '@fortawesome/free-solid-svg-icons';

const IconStrip: React.FC = () => {
    const icons = [
        { icon: faAngular, label: 'Angular', color: '#dd0031' },
        { icon: faGoogleDrive, label: 'Google Drive', color: '#34A853' },
        { icon: faPython, label: 'Python', color: '#3776AB' },
        { icon: faJava, label: 'Java', color: '#007396' },
        { icon: faLinux, label: 'Linux', color: '#FCC624' },
        { icon: faWindows, label: 'Windows', color: '#00A4EF' },
        { icon: faUbuntu, label: 'Ubuntu', color: '#E95420' },
        { icon: faDatabase, label: 'MongoDB', color: '#47A248' },  // MongoDB icon is not available in free-brands-svg-icons
        { icon: faReact, label: 'React', color: '#61DAFB' },
        { icon: faFacebook, label: 'Facebook', color: '#1877F2' },
        { icon: faTwitter, label: 'Twitter', color: '#1DA1F2' },
        { icon: faGithub, label: 'Github', color: '#181717' },
        { icon: faCodepen, label: 'CodePen', color: '#000000' },
        { icon: faSkype, label: 'Skype', color: '#00AFF0' },
        { icon: faUnity, label: 'Unity', color: '#000000' },
        { icon: faNodeJs, label: 'Node.js', color: '#339933', bgColor: '#ffffff' },
        { icon: faLinkedin, label: 'LinkedIn', color: '#0A66C2', bgColor: '#ffffff' },
        { icon: faChrome, label: 'Chrome', color: '#4285F4', bgColor: '#ffffff' },
        { icon: faBootstrap, label: 'Bootstrap', color: '#7952B3', bgColor: '#ffffff' },
        { icon: faCss3Alt, label: 'CSS', color: '#1572B6', bgColor: '#ffffff' },
        { icon: faYoutube, label: 'Dart', color: '#0175C2', bgColor: '#ffffff' },
    ];
    

    return (
        <div className="flex overflow-hidden h-full w-full">
            <div className="relative h-full overflow-hidden  w-1/2">
                <motion.div
                    className="absolute inset-0 flex flex-col items-center space-y-4"
                    animate={{ y: [0, -800] }} // Adjust -800 to match the total height of all icons
                    transition={{
                        repeat: Infinity,
                        duration: 12, // Adjust duration to control the speed
                        ease: 'linear',
                    }}
                >
                    {icons.map((item, index) => (
                        <div key={index} className="text-4xl px-3 py-2 rounded-lg bg-gray-50">
                            <FontAwesomeIcon icon={item.icon} style={{ color: item.color }} />
                        </div>
                    ))}

                </motion.div>
                
            </div>
            <div className="relative h-full overflow-hidden   w-1/2">
                <motion.div
                    className="absolute inset-0 flex flex-col items-center space-y-4"
                    animate={{ y: [ -800, 0] }} // Adjust -800 to match the total height of all icons
                    transition={{
                        repeat: Infinity,
                        duration: 12, // Adjust duration to control the speed
                        ease: 'linear',
                    }}
                >
                    {icons.map((item, index) => (
                        <div key={index} className="text-4xl px-3 py-2 rounded-lg bg-gray-50">
                            <FontAwesomeIcon icon={item.icon} style={{ color: item.color }} />
                        </div>
                    ))}

                </motion.div>

            </div>
        </div>
    );
};

export default IconStrip;
