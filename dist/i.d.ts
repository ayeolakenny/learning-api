type Checklist = {
    basicInfo: {
        name: string;
        certificateNumber: string;
        contractorName: string;
        projectDescription: string;
        projectLocation: string;
        inspectorName: string;
        inspectionDate: string;
    };
    data: {
        category: string;
        source: string;
        children: {
            description: string;
            response: string;
            remark: string;
        }[];
    }[];
    summary: {
        outcome: string;
        substandardPractices: {
            material: string;
            upload: string;
            remark: string;
        }[];
        omittedEquipment: {
            type: string;
            equipment: string;
            voltage: string;
            qty: number;
            price: number;
            amount: number;
        }[];
        conclusion: string;
    };
};
declare const data: {
    basicInfo: {
        name: string;
        certificateNumber: string;
        contractorName: string;
        projectDescription: string;
        projectLocation: string;
        inspectorName: string;
        inspectionDate: string;
    };
    data: {
        category: string;
        source: string;
        children: {
            description: string;
            response: string;
            remark: string;
        }[];
    }[];
    summary: {
        outcome: string;
        substandardPractices: {
            material: string;
            upload: string;
            remark: string;
        }[];
        omittedEquipment: {
            type: string;
            equipment: string;
            voltage: string;
            qty: number;
            price: number;
            amount: number;
        }[];
        conclusion: string;
    };
};
