'use client';

import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    annotationPlugin
);

function SkillTest({ questions, setQuestions }) {
    const [percentile, setPercentile] = useState(0);
    const [rank, setRank] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataPoints, setDataPoints] = useState([]);
    const [labels, setLabels] = useState([])
    const chartRef = useRef(null);

    // const dataPoints = [];
    // const labels = [dataPoints];

    const totalQuestion = 15


    const data = {
        labels,
        datasets: [
            {
                label: 'Percentile Curve',
                data: dataPoints,
                borderColor: 'blue',
                fill: false,
                tension: 0.9,
                pointBackgroundColor: 'white',
                pointRadius: 5,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem) =>
                        `Number of Students: ${dataPoints[tooltipItem.dataIndex]}`,
                },
            },
            legend: {
                display: false,
            },
            annotation: percentile >= 0 ? {
                annotations: {
                    userPercentile: {
                        type: 'bar',
                        xMin: percentile,
                        xMax: percentile,
                        borderColor: 'gray',
                        borderWidth: 2,
                    },
                },
            } : {},
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 1,
            },
        },
        scales: {
            x: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Percentile',
                },
                min: 0,
                max: 100,
                bounds: 'ticks',
                ticks: { stepSize: 25 },
                grid: {
                    display: false
                },

            },
            y: {
                display: false
            }
        },
        elements: {
            line: {
                borderWidth: 2,
            },
        },
    };


    useEffect(() => {
        const chart = chartRef.current;

        if (chart) {
            chart.options.plugins.annotation.annotations.userPercentile.xMin = percentile;
            chart.options.plugins.annotation.annotations.userPercentile.xMax = percentile;
            chart.update();
        }
    }, [percentile]);


    const handleUpdate = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const formData = new FormData(e.target);
    //     const newPercentile = Number(formData.get('percentile'))
    //     const newLabel = Number(formData.get('percentile'))

    //     setRank(formData.get('rank'));
    //     setPercentile(newPercentile);
    //     setQuestions(formData.get('questions'));
    //     setLabels((prev) => [...prev, prev.length + newLabel])

    //     setDataPoints((prev) => [...prev, newPercentile])
    //     handleCloseModal();
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const newPercentile = Number(formData.get("percentile"));

        setRank(formData.get("rank"));
        setPercentile(newPercentile);
        setQuestions(formData.get("questions"));

        // Add new data point
        setLabels((prevLabels) => {
            const updatedLabels = [...prevLabels, newPercentile];
            const updatedDataPoints = [...dataPoints, newPercentile];

            // Sort labels and data points together
            const sortedData = updatedLabels
                .map((label, index) => ({ label, value: updatedDataPoints[index] }))
                .sort((a, b) => a.label - b.label);

            // Update the labels and dataPoints in sorted order
            setDataPoints(sortedData.map((item) => item.value));
            return sortedData.map((item) => item.label);
        });

        handleCloseModal();
    };



    return (
        <div className="w-full">
            <p className="p-4">Skill Test</p>
            <div className="m-4 p-4 flex flex-row border rounded-md justify-between px-2 mb-4">
                <div className="flex gap-2">
                    <Image
                        src="/html-5 (1).png"
                        alt="Image"
                        width={48}
                        height={48}
                        className='hidden sm:hidden lg:block'
                    />
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className="font-bold items-start mr-auto">Hyper Text Markup Language</h1>
                        <p className="text-gray-600  lg:flex text-sm">
                            Question: 08 | Duration: 15mins | Submitted on 5 June 2021
                        </p>
                    </div>
                </div>

                <button
                    className="bg-blue-950 p-2 rounded-md text-white"
                    onClick={handleUpdate}
                >
                    Update
                </button>
            </div>

            <div className="flex justify-around items-center border rounded-md p-4 m-4">
                <p className="font-bold text-xs md:text-sm lg:text-lg">Quick Statistics</p>
                <div className="flex flex-row items-center gap-3 border-r p-3">
                    <Image
                        src="/trophy.png"
                        alt=""
                        width={30}
                        height={30}
                        className='hidden md:block lg:block'
                    />
                    <div className="items-center justify-center">
                        <h2>{rank}</h2>
                        <p className="text-xs uppercase">Your Rank</p>
                    </div>
                </div>
                <div className="flex gap-2 flex-row items-center border-r p-3">
                    <Image
                        src="/notes.png"
                        alt=""
                        width={30}
                        height={30}
                        className='hidden md:block lg:block'
                    />
                    <div className="items-center justify-center">
                        <h2>{percentile}%</h2>
                        <p className="text-xs uppercase">Percentile</p>
                    </div>
                </div>
                <div className="flex gap-2 flex-row items-center p-3">
                    <Image
                        src="/check.png"
                        alt=""
                        width={30}
                        height={30}
                        className='hidden md:block lg:block'
                    />
                    <div className="items-center justify-center">
                        <h2>{questions} / {totalQuestion}</h2>
                        <p className="text-xs uppercase">Correct Answer</p>
                    </div>
                </div>
            </div>

            <div className="border p-4 m-4 rounded-md">
                <p className="mb-4 text-sm lg:text-lg font-bold">Comparison Graph</p>
                <div className="flex flex-row justify-between mb-4">
                    <p className='text-xs lg:text-lg'>
                        <strong className='sm:text-sm lg:text-md'>You scored {percentile}% percentile</strong> which is lower than the <br />
                        average percentile of 72% of all the engineers who took this
                        assessment.
                    </p>
                    <Image
                        src="/trend.png"
                        alt=""
                        width={35}
                        height={35}
                        className='hidden md:block lg:block'
                    />
                </div>
                <Line ref={chartRef} data={data} options={options} />
            </div>

            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-8 w-[400px] md:w-[600px] lg:w-[800px]">
                        <div>
                            <h2 className="text-lg font-bold mb-4">Update scores</h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="flex lg:flex-row flex-col justify-between items-center gap-5 mb-5">
                                <div className='flex items-center gap-3'>
                                    <span className='bg-blue-600 hidden lg:block rounded-full text-white px-3'>1</span>
                                    <label className="text-sm font-medium whitespace-nowrap">Update your <strong>Rank</strong></label>
                                </div>
                                <input
                                    type="number"
                                    name="rank"
                                    max='100'
                                    value={rank}
                                    onChange={(e) => setRank(e.target.value)}
                                    className="w-[250px] md:w-[300px] border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2"
                                    required
                                />
                            </div>
                            <div className="flex lg:flex-row flex-col justify-between items-center gap-5 mb-5">
                                <div className='flex items-center gap-3'>
                                    <span className='bg-blue-600 rounded-full hidden lg:block text-white px-3'>2</span>
                                    <label className="text-sm font-medium whitespace-nowrap">Update your <strong>Percentile</strong></label>
                                </div>
                                <input
                                    type="number"
                                    name="percentile"
                                    max='100'
                                    value={percentile}
                                    onChange={(e) => setPercentile(e.target.value)}
                                    className="w-[250px] md:w-[300px] border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2"
                                    required
                                />
                            </div>
                            <div className="flex lg:flex-row flex-col justify-between items-center gap-5 mb-5">
                                <div className='flex items-center gap-3'>
                                    <span className='bg-blue-600 rounded-full hidden lg:block text-white px-3'>3</span>
                                    <label className="text-sm font-medium whitespace-nowrap">Update your <strong>Current Score (out of 15)</strong></label>
                                </div>

                                <input
                                    type="number"
                                    name="questions"
                                    max={totalQuestion}
                                    value={questions}
                                    onChange={(e) => setQuestions(e.target.value)}
                                    className="w-[250px] md:w-[300px] border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2"
                                    required
                                />
                            </div>
                            <div className="flex justify-between lg:justify-end  gap-3">
                                <button
                                    type="button"
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md font-medium"
                                    onClick={handleCloseModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2"
                                >
                                    Save <span className="text-xl">→</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}

export default SkillTest;
