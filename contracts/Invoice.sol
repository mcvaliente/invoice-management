// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Invoice {
    
    struct InvoiceInfo {
        bytes32 invoiceId;
        bytes16 issueDate;
        bytes16 expiryDate; //dd/mm/aaaa
        bytes16 categoryId;
        MemberInfo member;
        bool validInvoice;
    }
    
    struct MemberInfo {
        bytes32 id; //hash of the id of the member
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
    
    mapping(bytes32 => InvoiceInfo) invoices;
    uint32 deployedInvoices;
    
    function createInvoice(
        bytes32 invoiceId,
        bytes16[] memory invoicesDate,
        bytes16 categoryId,
        bytes32 memberId,
        bytes16 gender,
        uint256 age,
        bytes32[] memory location,
        bytes16 occupationId

    ) public {

        LocationInfo memory locationData = LocationInfo({
            office: location[0],
            county: location[1],
            country: location[2]
        });
        
        MemberInfo memory memberData = MemberInfo({
            id: memberId,
            gender: gender,
            age: age,
            location: locationData,
            occupationId: occupationId
        });
        
        InvoiceInfo memory invoiceData = InvoiceInfo({
            invoiceId: invoiceId,
            issueDate: invoicesDate[0],
            expiryDate: invoicesDate[1],
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
            invoices[invoiceId].member.id,
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
