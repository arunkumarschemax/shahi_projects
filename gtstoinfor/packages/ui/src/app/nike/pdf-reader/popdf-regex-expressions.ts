export const EMP_STR_EXP = /^\s*$/
export const ITEM_NO_EXP = /^0*(?:[1-9]\d*0|0)0*$/
export const ITEM_NO_INDEX = 0
export const ITEM_MATERIAL_INDEX = 1
export const ITEM_DESCRIPTION_INDEX = ITEM_MATERIAL_INDEX + 1 // 2
export const ITEM_DELIVERYDATE_INDEX = ITEM_DESCRIPTION_INDEX + 1 // 3
export const ITEM_MODE_INDEX = ITEM_DELIVERYDATE_INDEX + 1 // 4
export const ITEM_ACCEPTANCEDATE_INDEX = ITEM_MODE_INDEX + 1 // 5
export const ITEM_SHIP_TO_TEXT = 'SHIP TO :'
export const ITEM_SHIP_TO_INDEX = ITEM_ACCEPTANCEDATE_INDEX + 1 // 6
export const ITEM_SHIP_TO_INDEXES = [7, 8, 9, 10]
export const ITEM_TEXT_TEXT = 'ITEM TEXT'
export const ITEM_TEXT_INDEX = ITEM_SHIP_TO_INDEX + 5 // 10
export const ITEM_TEXT_START_INDEX = ITEM_TEXT_INDEX + 1
export const ITEM_TEXT_END_TEXT = "EA"
export const ITEM_TEXT_END_TEXT2 = "ITEM TOTAL IN"
export const UNWANTED_TEXT_1 = 'This purchase order and '
export const UNWANTED_TEXT_2 = 'and Seller agrees to be '
export const UNWANTED_TEXT_3 = 'Buyer for a copy of the '
export const UNWANTED_TEXT_4 = 'CUSTOMER PO No :'
export const UNWANTED_TEXT_5 = "_____________________________"
export const UNWANTED_TEXT_6 = "This purchase order and contract is subject to and expressly conditioned"
export const UNWANTED_TEXT_7 = "of and Seller agrees to be bound by them whether or not Seller has received them."
export const UNWANTED_TEXT_8 = "contact Buyer for a copy of the terms and conditions before acting on this purchase order and contract."
export const UNWANTED_TEXT_9 = "PURCHASE ORDER"
export const UNWANTED_TEXT_10 = "An Equal Opportunity Employer"
export const PO_DOC_DATE_TXT = 'LOCATION'
export const PO_DOC_DATE_INDEX = 1
export const SEASONYEAR_INDEX = 2
export const DIVISIONBUYGROUP_INDEX = [3, 7]
export const CURR_INDEX = 4
export const INCOTERMS_INDEX = [5, 8]
export const FACTORYLOCATION_INDEX = 6
export const PO_NUMBER_TEXT = 'PO NUMBER'
export const PO_NUMBER_INDEX = 2
export const SELLER_ADDRESS_START_TEXT = "SELLER:"
export const SELLER_ADDRESS_END_TEXT = "BUYER:"




