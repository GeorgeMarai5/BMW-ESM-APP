export interface Vehicle{
    map(arg0: (e: any) => { id: any; VehicleID: any; VINNumber: any; vehicleModel: any; year: string; }): any[];
    viN_Number: string;
    vehicleModel: string;
    registration: string;
    warrantyPlan: string;
    fleetID: string | null;
}