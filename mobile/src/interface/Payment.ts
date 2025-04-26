export interface PaymentProps {
    paymentId: number;
    invoiceId: number;
    amount: number;
    method: string;
    status: string;   
    paymentDate: string; 
}