import { product, application_user, notification, customer_order, customer, packaging} from '@prisma/client';
export class TestData {
    //primitive values
    public static readonly ID = "testId"
    public static readonly NAME = "testName"
    public static readonly NAME_2 = "testName2"
    public static readonly DESCRIPTION = "testDescription"
    public static readonly EXPECTED_DATE = new Date();
    public static readonly NUMBER_IN_STOCK = 5
    public static readonly UNIT_PRICE = 69.69
    public static readonly PICTURE = new Buffer("TEST");
    public static readonly PASSWORD = "testPassword"
    public static readonly ROLE = "testRole";
    public static readonly EXTRA_VALIDATION_CODE = "testExtraCode";
    public static readonly TRACK_AND_TRACE = "testCode";
    public static readonly STATUS = "testStatus";
    public static readonly PHONE_NUMBER= "1234567890"
    public static readonly HEIGHT= 1
    public static readonly WIDTH= 2
    public static readonly LENGTH= 3
    public static readonly TYPE= "testBox"


    //objects
    //product
    public static readonly TEST_PRODUCT:product =  {product_id:this.ID, name:this.NAME, description: this.DESCRIPTION, expected_delivery_date:this.EXPECTED_DATE,number_in_stock:this.NUMBER_IN_STOCK, unit_price:this.UNIT_PRICE, picture:this.PICTURE};
    public static readonly TEST_PRODUCT_2:product =  {product_id:this.ID, name:this.NAME_2, description: this.DESCRIPTION, expected_delivery_date:this.EXPECTED_DATE,number_in_stock:this.NUMBER_IN_STOCK, unit_price:this.UNIT_PRICE, picture:this.PICTURE};
    //user
    public static readonly TEST_USER:application_user = {user_id: this.ID, email:this.NAME, password:this.PASSWORD,role:this.ROLE,persoonsgegevens_person_id:this.ID}
    public static readonly TEST_USER_WITH_NOTIFICATIONS:{user:application_user,notifications:notification[]} = {user:{user_id: this.ID, email:this.NAME, password:this.PASSWORD,role:this.ROLE,persoonsgegevens_person_id:this.ID},notifications: []}
    //notification
    public static readonly TEST_NOTIFICATION: notification = {id: this.ID, active:true, date_created: this.EXPECTED_DATE, id_of_order_to_be_checked: this.ID}
    //customer order
    public static readonly TEST_CUSTOMER_ORDER: customer_order = {order_id: this.ID, extra_validation_code:this.EXTRA_VALIDATION_CODE, track_trace_code:this.TRACK_AND_TRACE, order_date: this.EXPECTED_DATE, status:this.STATUS, customer_customer_id:this.ID, delivery_address_address_id:this.ID, purchaser_person_id:this.ID, transport_transport_id:this.ID, packaging_packaging_id:this.ID}
    //customer
    public static readonly TEST_CUSTOMER: customer = {customer_id: this.ID, logo: this.PICTURE, name: this.NAME, phone_number: this.PHONE_NUMBER, address_address_id: this.ID}
    //packaging
    public static readonly TEST_PACKAGING: packaging = {packaging_id:this.ID, active:true,height:this.HEIGHT,width:this.WIDTH,length:this.LENGTH,packaging_name:this.NAME,price:this.UNIT_PRICE,type:this.TYPE}
}