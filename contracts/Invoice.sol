// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

/**
 * A base contract to be inherited by any contract that want to receive relayed transactions
 * A subclass must use "_msgSender()" instead of "msg.sender"
 */
contract BaseRelayRecipient {

    /*
     * Forwarder singleton we accept calls from
     */
    address public trustedForwarder;

    modifier trustedForwarderOnly() {
        require(msg.sender == address(trustedForwarder), "Function can only be called through the trusted Forwarder.");
        _;
    }

    function isTrustedForwarder(address forwarder) public view returns(bool) {
        return forwarder == trustedForwarder;
    }

    /**
     * return the sender of this call.
     * if the call came through our trusted forwarder, return the original sender.
     * otherwise, return `msg.sender`.
     * should be used in the contract anywhere instead of msg.sender
     */
    function _msgSender() internal virtual view returns (address ret) {
        if (msg.data.length >= 24 && isTrustedForwarder(msg.sender)) {
            // At this point we know that the sender is a trusted forwarder,
            // so we trust that the last bytes of msg.data are the verified sender address.
            // Extract sender address from the end of msg.data.
            assembly {
                ret := shr(96,calldataload(sub(calldatasize(),20)))
            }
        } else {
            return msg.sender;
        }
    }
}

contract Invoice is BaseRelayRecipient {
    
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

    constructor (address _trustedForwarder) {
        trustedForwarder = _trustedForwarder;
    }
   
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