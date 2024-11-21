import Image from "next/image";
import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

const ProgressBars = ({ questions }) => {

    const totalQuestions = 15
    const percentage = (questions / totalQuestions) * 100

    return (
        <div className="lg:w-[48%] w-full sm:w-full p-4  mt-[59px] rounded-lg shadow-sm">
            <div className="h-[50%] p-4 border rounded-lg shadow-sm">
                <p className="mb-4 text-sm lg:text-lg font-semibold">Syllabus Wise Analysis</p>
                <div className="shadow-sm mb-4">
                    <div className="m-3">
                        <div className="flex justify-between items-center mb-7">
                            <span className="text-gray-800 text-sm lg:text-lg font-medium">HTML Tools, Forms, History</span>
                            <span className="text-sm text-blue-500">80 %</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="h-2.5 rounded-full bg-blue-500" style={{ width: "80%" }}></div>
                        </div>
                    </div>
                </div>

                <div className="shadow-sm mb-4">
                    <div className="m-3">
                        <div className="flex justify-between items-center mb-7">
                            <span className="text-gray-800 text-sm lg:text-lg font-medium">Tags & References in HTML</span>
                            <span className="text-sm text-orange-400">60 %</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="h-2.5 rounded-full bg-orange-400" style={{ width: "60%" }}></div>
                        </div>
                    </div>
                </div>

                <div className="shadow-sm mb-4">
                    <div className="m-3">
                        <div className="flex justify-between items-center mb-7">
                            <span className="text-gray-800 text-sm lg:text-lg font-medium">Tables & References in HTML</span>
                            <span className="text-sm text-red-500">24 %</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="h-2.5 rounded-full bg-red-500" style={{ width: "24%" }}></div>
                        </div>
                    </div>
                </div>

                <div className="shadow-sm mb-4">
                    <div className="m-3">
                        <div className="flex justify-between items-center mb-7">
                            <span className="text-gray-800 text-sm lg:text-lg font-medium">Tables & CSS Basics</span>
                            <span className="text-sm text-green-500">96%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="h-2.5 rounded-full bg-green-500" style={{ width: "96%" }}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border rounded-lg mt-4">
                <div className="flex justify-between p-3">
                    <p>Question Analysis</p>
                    <p>{questions}/{totalQuestions}</p>
                </div>
                <p className="text-sm p-2">You Scored {questions} questions correct out of {totalQuestions}. However it still need some improvements</p>
                <div className="flex items-center justify-center mb-5">
                    <div className="relative flex justify-center items-center mt-4" style={{ width: '130px', height: '130px' }}>
                        <CircularProgressbar className="absolute inset-0"
                            value={percentage}
                            text=""
                            styles={{
                                path: {
                                    stroke: `#0000FF`,
                                },
                                trail: {
                                    stroke: '#d6d6d6',
                                },
                            }}
                        />
                        <Image
                            src='/target.png'
                            alt="Center Image"
                            width={48}
                            height={48}
                            className="absolute"
                            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                        />
                    </div>
                </div>

            </div>

        </div>
    );
};

export default ProgressBars;
