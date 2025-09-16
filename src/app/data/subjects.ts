interface Subject {
    id: number;
    name: string;
    NumberOfCreditHours: number;
    NumberOfAvailableSections: number;
    AvailableOptions: string[];
    imageOfAvailableSections?: string;
}

const subjects: Subject[] = [
    {
        id: 1,
        name: "Fluid Mechanics",
        NumberOfCreditHours: 3,
        NumberOfAvailableSections: 1,
        AvailableOptions: ["Sun Tue Thu at 10:00 AM - 11:00 AM"]
    },
    {
        id: 2,
        name: "Thermodynamics 2",
        NumberOfCreditHours: 3,
        NumberOfAvailableSections: 1,
        AvailableOptions: ["Mon Wed at 10:30 AM - 12:00 PM"]
    },
    {
        id: 3,
        name: "Manufacturing Processes",
        NumberOfCreditHours: 3,
        NumberOfAvailableSections: 3,
        AvailableOptions: ["Mon 10:30 - 12:00", "Wed 10:30 - 12:00", "Wed 12:00 - 1:30"]
    },
    {
        id: 4,
        name: "Applied Mathematics",
        NumberOfCreditHours: 3,
        NumberOfAvailableSections: 2,
        AvailableOptions: ["Sun Tue Thu 9:00 - 10:00", "Sun Tue Thu 11:00 - 12:00"]
    },
    {
        id: 5,
        name: "Fundamaentals of Electronics and Digital Logic",
        NumberOfCreditHours: 3,
        NumberOfAvailableSections: 2,
        AvailableOptions: ["Sun Tue Thu 1:00 - 2:00", "Mon Wed 9:00 - 10:30"]
    },
    {
        id: 6,
        name: "Mechanics of Machines",
        NumberOfCreditHours: 3,
        NumberOfAvailableSections: 1,
        AvailableOptions: ["Sun Thu 12:00 - 1:00"]
    },
    {
        id: 7,
        name: "Electric Drive",
        NumberOfCreditHours: 3,
        NumberOfAvailableSections: 1,
        AvailableOptions: ["Mon Wed 12:00 - 1:30"]
    },
    {
        id: 8,
        name: "Engineering Drawing A",
        NumberOfCreditHours: 1,
        NumberOfAvailableSections: 20,
         AvailableOptions: [
            "Section 1: Sun 10:00 - 12:00",
            "Section 2: Sun 12:00 - 2:00", 
            "Section 3: Sun 10:00 - 12:00",
            "Section 4: Sun 2:00 - 4:00",
            "Section 5: Mon 9:00 - 11:00",
            "Section 6: Mon 11:00 - 1:00",
            "Section 7: Mon 1:00 - 3:00",
            "Section 8: Mon 11:00 - 1:00",
            "Section 9: Tue 10:00 - 12:00",
            "Section 10: Tue 10:00 - 12:00",
            "Section 11: Tue 12:00 - 2:00",
            "Section 12: Tue 2:00 - 4:00",
            "Section 13: Tue 2:00 - 4:00",
            "Section 14: Wed 11:00 - 1:00",
            "Section 15: Wed 11:00 - 1:00",
            "Section 16: Wed 1:00 - 3:00",
            "Section 17: Wed 9:00 - 11:00",
            "Section 18: Thu 12:00 - 2:00",
            "Section 19: Thu 2:00 - 4:00",
            "Section 20: Thu 2:00 - 4:00",
        ],
        imageOfAvailableSections: "/images/subjects/A.png"
    },
    {
        id: 9,
        name: "Physics Lab",
        NumberOfCreditHours: 1,
        NumberOfAvailableSections: 30,
        AvailableOptions: ["Multiple Sections Available"],
        imageOfAvailableSections: "/images/subjects/P.png"
    },
    {
        id: 10,
        name: "Mechanics Lab",
        NumberOfCreditHours: 1,
        NumberOfAvailableSections: 3,
        AvailableOptions: ["Sun 1:30 - 4:30", "Mon 1:30 - 4:30", "Thu 1:30 - 4:30"]
    },
    {
        id: 11,
        name: "Engineering Drawing B",
        NumberOfCreditHours: 1,
        NumberOfAvailableSections: 5,
        AvailableOptions: [
            "Section 1: Mon 10:30 - 1:30",
            "Section 2: Wed 10:30 - 1:30",
            "Section 3: Wed 1:30 - 4:30",
            "Section 4: Thu 9:00 - 12:00",
            "Section 5: Thu 12:00 - 3:00"
        ]
    }
];

export default subjects;
