// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Invoice {
    
    struct InvoiceInfo {
        bytes16 issueDate;
        bytes16 expiryDate; //dd/mm/aaaa
        bytes16 categoryId;
        MemberInfo member;
        bool validInvoice;
    }
    
    struct MemberInfo {
        bytes32 memberId; //hash of the id of the member
        bytes16 gender; //F (Female) M (Male) O (Other)
        uint256 age;
        LocationInfo location;
        bytes16 occupationId;
        
    }
    
    struct LocationInfo {
        bytes32 office;
        bytes32 county;
        bytes32 country;
    }
    
    mapping(bytes32 => InvoiceInfo) invoices; //bytes32 represents invoiceId
    uint32 deployedInvoices;
    
    function createInvoice(
        bytes32 invoiceId,
        bytes32 memberId,
        bytes32[] memory location,
        bytes16[] memory invoiceDates,
        bytes16 categoryId,
        bytes16 gender,
        bytes16 occupationId,
        uint256 age

    ) public {

        LocationInfo memory locationData = LocationInfo({
            office: location[0],
            county: location[1],
            country: location[2]
        });
        
        MemberInfo memory memberData = MemberInfo({
            memberId: memberId,
            gender: gender,
            age: age,
            location: locationData,
            occupationId: occupationId
        });
        
        InvoiceInfo memory invoiceData = InvoiceInfo({
            issueDate: invoiceDates[0],
            expiryDate: invoiceDates[1],
            categoryId: categoryId,
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
            bytes32,
            bytes16,
            bytes16,
            bytes16,
            bytes16,
            bytes16,
            uint256
        )
    {
        return (
            invoices[invoiceId].member.memberId,
            invoices[invoiceId].issueDate,
            invoices[invoiceId].expiryDate,
            invoices[invoiceId].categoryId,
            invoices[invoiceId].member.gender,
            invoices[invoiceId].member.occupationId,
            invoices[invoiceId].member.age
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
            invoices[invoiceId].member.location.office,
            invoices[invoiceId].member.location.county,
            invoices[invoiceId].member.location.country
        );
    }
    

}