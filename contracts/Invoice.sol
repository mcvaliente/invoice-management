// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Invoice {
    
    struct InvoiceInfo {
        bool paid;
        bytes16 invoiceDate; //aaaa-mm-dd
        bytes16 dueDate; //aaaa-mm-dd
        bytes16[] occupations;
        CostInfo amount ;
        MemberInfo member;
        bool validInvoice;
    }
    
    struct CostInfo {
        bytes16 vatBase; //2 decimal points
        bytes16 vatPercentage; //2 decimal points
        bytes16 usdExchangeRate; //6 decimal points

    }
 
     struct MemberInfo {
        bytes16 gender; //female, male, other
        uint256 age;
        LocationInfo location;
    }
    
    struct LocationInfo {
        bytes32 cooperative;
        bytes32 country;
        bytes32 office;
    }
    
    mapping(bytes32 => InvoiceInfo) invoices; //bytes32 represents invoiceId
    uint32 deployedInvoices;
    
    function createInvoice(
        bool paid,
        bytes32 invoiceId,
        bytes32[] memory location,
        bytes16[] memory invoiceDates,
        bytes16[] memory costData,
        bytes16[] memory occupations,
        bytes16 gender,
        uint256 age

    ) public {

        LocationInfo memory locationData = LocationInfo({
            cooperative: location[0],
            country: location[1],
            office: location[2]
        });
        
        MemberInfo memory memberData = MemberInfo({
            gender: gender,
            age: age,
            location: locationData
        });
        
        CostInfo memory amountData = CostInfo({
            vatBase: costData[0],
            vatPercentage: costData[1],
            usdExchangeRate: costData[2]
        });

        InvoiceInfo memory invoiceData = InvoiceInfo({
            paid: paid,
            invoiceDate: invoiceDates[0],
            dueDate: invoiceDates[1],
            occupations: occupations,
            amount: amountData,
            member: memberData,
            validInvoice: true
        });

        invoices[invoiceId] = invoiceData;
        deployedInvoices++;
    }

    function getInvoiceCount() public view returns (uint32) {
        return deployedInvoices;
    }
    
    function invoiceExists(bytes32 invoiceId) public view returns (bool) {
        if (invoices[invoiceId].validInvoice) {
            return true;
        } else {
            return false;
        }
    }
    
    function getInvoiceSummary(bytes32 invoiceId)
        public
        view
        returns (
            bool,
            bytes16,
            bytes16,
            bytes16,
            uint256
        )
    {
        return (
            invoices[invoiceId].paid,
            invoices[invoiceId].invoiceDate,
            invoices[invoiceId].dueDate,
            invoices[invoiceId].member.gender,
            invoices[invoiceId].member.age
        );
    }
    
    function getInvoicingInfo(bytes32 invoiceId)
        public
        view
        returns (
            bytes16,
            bytes16,
            bytes16
        )
    {
        return (
            invoices[invoiceId].amount.vatBase,
            invoices[invoiceId].amount.vatPercentage,
            invoices[invoiceId].amount.usdExchangeRate
        );
    }

    function getOccupationsInfo(bytes32 invoiceId)
        public
        view
        returns (
            bytes16[] memory
        )
    {
        return (
            invoices[invoiceId].occupations
        );
    }

   function getMemberLocation(bytes32 invoiceId)
        public
        view
        returns (
            bytes32,
            bytes32,
            bytes32
        )
    {
        return (
            invoices[invoiceId].member.location.cooperative,
            invoices[invoiceId].member.location.country,
            invoices[invoiceId].member.location.office
        );
    }
    

}