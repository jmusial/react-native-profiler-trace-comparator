import {ProfilerFile, SnapshotNode} from "../types/FileEntry";

const createNode = (id: number, displayName: string): SnapshotNode => ({
    id,
    children: [],
    displayName,
    hocDisplayNames: null,
    key: null,
    type: 1,
    compiledWithForget: false,
});

const commonSnapshots: [number, SnapshotNode][] = [
    [1, createNode(1, "App")],
    [2, createNode(2, "Header")],
    [3, createNode(3, "Button")],
    [4, createNode(4, "List")],
];

// Encodes an operations array that ADDs fiber id=5 with displayName "Modal"
// and fiber id=6 with displayName "Tooltip", simulating components mounted during profiling.
// Format: [rendererID, rootFiberID, stringTableSize, ...stringTable, ...ops]
// String table entry: [charCount, ...charCodes]
// ADD op: [1, fiberID, type, parentID, ownerID, nameStringIdx, keyStringIdx, compiledWithForget]
const modalChars = Array.from("Modal").map(c => c.charCodeAt(0));    // 5 chars
const tooltipChars = Array.from("Tooltip").map(c => c.charCodeAt(0)); // 7 chars
const stringTableSize = (1 + modalChars.length) + (1 + tooltipChars.length);
const dynamicMountOps: number[][] = [
    [
        1, 1,                                          // rendererID=1, rootFiberID=1
        stringTableSize,                               // string table size
        modalChars.length, ...modalChars,              // string 1: "Modal"
        tooltipChars.length, ...tooltipChars,          // string 2: "Tooltip"
        1, 5, 5, 1, 1, 1, 0, 0,                       // ADD fiber 5, type=5, parent=1, owner=1, name=str[0], key=null, forget=0
        1, 6, 5, 1, 1, 2, 0, 0,                       // ADD fiber 6, type=5, parent=1, owner=1, name=str[1], key=null, forget=0
    ],
];

export const mockFile1: ProfilerFile = {
    version: 1.2,
    dataForRoots: [
        {
            snapshots: commonSnapshots,
            commitData: [
                {
                    duration: 10,
                    effectDuration: 1,
                    passiveEffectDuration: 1,
                    timestamp: 100,
                    priorityLevel: "Normal",
                    changeDescriptions: null,
                    updaters: [],
                    fiberActualDurations: [[1, 10], [2, 5], [3, 5]],
                    fiberSelfDurations:   [[1, 2],  [2, 5], [3, 3]],
                },
                {
                    duration: 5,
                    effectDuration: 0.5,
                    passiveEffectDuration: 0,
                    timestamp: 200,
                    priorityLevel: "Normal",
                    changeDescriptions: null,
                    updaters: [],
                    fiberActualDurations: [[2, 5]],
                    fiberSelfDurations:   [[2, 5]],
                },
                {
                    duration: 5,
                    effectDuration: 0.5,
                    passiveEffectDuration: 0,
                    timestamp: 300,
                    priorityLevel: "Normal",
                    changeDescriptions: null,
                    updaters: [],
                    fiberActualDurations: [[3, 5]],
                    fiberSelfDurations:   [[3, 5]],
                },
                {
                    duration: 5,
                    effectDuration: 0,
                    passiveEffectDuration: 0,
                    timestamp: 400,
                    priorityLevel: "Normal",
                    changeDescriptions: null,
                    updaters: [],
                    fiberActualDurations: [[4, 5]],
                    fiberSelfDurations:   [[4, 5]],
                },
            ],
        }
    ]
};

export const mockFile2: ProfilerFile = {
    version: 1.2,
    dataForRoots: [
        {
            snapshots: commonSnapshots,
            commitData: [
                {
                    duration: 20,
                    effectDuration: 2,
                    passiveEffectDuration: 2,
                    timestamp: 1000,
                    priorityLevel: "Normal",
                    changeDescriptions: null,
                    updaters: [],
                    fiberActualDurations: [[1, 20], [2, 10], [3, 5], [4, 5]],
                    fiberSelfDurations:   [[1, 5],  [2, 8],  [3, 5], [4, 2]],
                },
                {
                    duration: 4,
                    effectDuration: 1,
                    passiveEffectDuration: 0,
                    timestamp: 1100,
                    priorityLevel: "Normal",
                    changeDescriptions: null,
                    updaters: [],
                    fiberActualDurations: [[2, 4]],
                    fiberSelfDurations:   [[2, 4]],
                },
                {
                    duration: 4,
                    effectDuration: 0,
                    passiveEffectDuration: 0,
                    timestamp: 1200,
                    priorityLevel: "Normal",
                    changeDescriptions: null,
                    updaters: [],
                    fiberActualDurations: [[3, 4]],
                    fiberSelfDurations:   [[3, 4]],
                },
                {
                    duration: 4,
                    effectDuration: 0,
                    passiveEffectDuration: 0,
                    timestamp: 1300,
                    priorityLevel: "Normal",
                    changeDescriptions: null,
                    updaters: [],
                    fiberActualDurations: [[4, 4]],
                    fiberSelfDurations:   [[4, 4]],
                },
                {
                    duration: 8,
                    effectDuration: 1,
                    passiveEffectDuration: 0.5,
                    timestamp: 1400,
                    priorityLevel: "Normal",
                    changeDescriptions: null,
                    updaters: [],
                    fiberActualDurations: [[3, 8]],
                    fiberSelfDurations:   [[3, 8]],
                },
            ],
        }
    ]
} ;

// File where fiber IDs 5 and 6 appear in durations but NOT in snapshots —
// they are only discoverable via the operations array.
export const mockFileWithDynamicMounts: ProfilerFile = {
    version: 5,
    dataForRoots: [
        {
            snapshots: commonSnapshots,
            operations: dynamicMountOps,
            commitData: [
                {
                    duration: 12,
                    effectDuration: 1,
                    passiveEffectDuration: 0,
                    timestamp: 500,
                    priorityLevel: "Normal",
                    changeDescriptions: null,
                    updaters: [],
                    fiberActualDurations: [[1, 4], [5, 6], [6, 2]],
                    fiberSelfDurations:   [[1, 1], [5, 5], [6, 2]],
                },
            ],
        },
    ],
};

export const mockFilesArray = [mockFile1, mockFile2];
