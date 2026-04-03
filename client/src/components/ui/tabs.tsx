"use client";

import React, { useRef } from 'react';
import { useState } from "react";
import { motion } from "framer-motion";
import { cn_class } from "../../utils/cn";

type Tab = {
    title: string;
    value: string;
    content?: string | React.ReactNode | any;
};

export const Tabs = ({
    tabs: propTabs,
    containerClassName,
    activeTabClassName,
    tabClassName,
    contentClassName,
}: {
    tabs: Tab[];
    containerClassName?: string;
    activeTabClassName?: string;
    tabClassName?: string;
    contentClassName?: string;
}) => {
    const [active, setActive] = useState<Tab>(propTabs[0]);
    const [tabs, setTabs] = useState<Tab[]>(propTabs);

    const moveSelectedTabToTop = (idx: number) => {
        const newTabs = [...propTabs];
        const selectedTab = newTabs.splice(idx, 1);
        newTabs.unshift(selectedTab[0]);
        setTabs(newTabs);
        setActive(newTabs[0]);
    };

    const [hovering, setHovering] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const copyToClipboard = () => {
        if (textareaRef.current) {
            navigator.clipboard.writeText(textareaRef.current.value).then(() => {
                alert('Code copied to clipboard!');
            }).catch((err) => {
                console.error('Could not copy text: ', err);
            });
        }
    };

    return (
        <>
            <div
                className={cn_class(
                    "flex flex-row items-center justify-between [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
                    containerClassName
                )}
            >
                <div data-aos='zoom-in' data-aos-duration='1300' className="flex flex-row items-center">
                    {propTabs.map((tab, idx) => (
                        <button
                            key={tab.title}
                            onClick={() => {
                                moveSelectedTabToTop(idx);
                            }}
                            onMouseEnter={() => setHovering(true)}
                            onMouseLeave={() => setHovering(false)}
                            className={cn_class("relative px-4 py-2 rounded-full", tabClassName)}
                            style={{
                                transformStyle: "preserve-3d",
                            }}
                        >
                            {active.value === tab.value && (
                                <motion.div
                                    layoutId="clickedbutton"
                                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                                    className={cn_class(
                                        "absolute inset-0 bg-[#27272a] text-black dark:bg-zinc-800 rounded-full",
                                        activeTabClassName
                                    )}
                                />
                            )}

                            <span className="relative block text-center text-white dark:text-white w-24">
                                {tab.title}
                            </span>
                        </button>
                    ))}
                </div>
                <div className="flex flex-row items-end space-x-2">
                    <button data-aos='flip-left' data-aos-duration='1300' className="px-2 py-2 rounded-full bg-blue-500 text-white w-24" onClick={copyToClipboard}><i className="fa fa-copy me-2"></i>Copy</button>
                    <button data-aos='flip-left' data-aos-duration='1300' className="px-2 py-2 rounded-full bg-green-500 text-white w-20"><i className="fa fa-play-circle-o me-2 text-xl"></i>Run</button>
                    <button data-aos='flip-left' data-aos-duration='1300' className="px-2 py-2 rounded-full bg-red-500 text-white w-36"><i className="fa fa-terminal me-2"></i>Playground</button>
                </div>

            </div>
            <FadeInDiv 
                
                tabs={tabs}
                active={active}
                key={active.value}
                hovering={hovering}
                className={cn_class("mt-16", contentClassName)}
            />

        </>
    );
};

export const FadeInDiv = ({
    className,
    tabs,
    hovering,
}: {
    className?: string;
    key?: string;
    tabs: Tab[];
    active: Tab;
    hovering?: boolean;
}) => {
    const isActive = (tab: Tab) => {
        return tab.value === tabs[0].value;
    };
    return (
        <div className="relative w-full h-full" >
            {tabs.map((tab, idx) => (
                <motion.div
                    
                    key={tab.value}
                    layoutId={tab.value}
                    style={{
                        scale: 1 - idx * 0.1,
                        top: hovering ? idx * -50 : 0,
                        zIndex: -idx,
                        opacity: idx < 3 ? 1 - idx * 0.1 : 0,
                    }}
                    animate={{
                        y: isActive(tab) ? [0, 40, 0] : 0,
                    }}
                    className={cn_class("w-full h-full absolute top-0 left-0", className)}
                >
                    {tab.content}
                </motion.div>
            ))}
        </div>
    );
};
