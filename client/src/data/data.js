import plane from "../assets/plane.png";
import truck from "../assets/truck.png";
import shipper from "../assets/shipper.png";

export const dataTrans = [
  {
    id: 1,
    name: "Vận chuyển tiêu chuẩn",
    img: shipper,
    value: "standard",
    price: 10000,
    speed: 60,
    description:
      "Vận chuyển tiêu chuẩn là phương thức thông dụng để gửi hàng hóa từ một điểm đến điểm đích khác một cách đáng tin cậy. Đây là lựa chọn phổ biến cho việc vận chuyển hàng hóa có trọng lượng và kích thước trung bình. Phương thức này đảm bảo thời gian giao hàng ổn định và đáng tin cậy, đồng thời có nhiều tùy chọn về giá cả phù hợp với ngân sách của khách hàng.",
  },
  {
    id: 2,
    name: "Vận chuyển nhanh",
    img: truck,
    value: "fast",
    price: 20000,
    speed: 120,
    description:
      "Vận chuyển nhanh là một phương thức gửi hàng hóa nhanh chóng từ điểm gốc đến điểm đích. Nó bao gồm các dịch vụ vận chuyển ưu tiên. Phương thức này đáp ứng nhu cầu gấp gáp và yêu cầu giao hàng nhanh của khách hàng. đảm bảo thời gian giao hàng nhanh chóng, đáng tin cậy, đồng thời thường có giá cao hơn so với phương thức vận chuyển tiêu chuẩn",
  },
  {
    id: 3,
    name: "Vận chuyển cấp tốc",
    img: plane,
    value: "expedited",
    price: 30000,
    speed: 800,
    description:
      "Vận chuyển cấp tốc là dịch vụ gửi hàng hóa với thời gian giao hàng rất nhanh. Đây là lựa chọn khi cần giao hàng gấp, đáp ứng yêu cầu khẩn cấp. Vận chuyển cấp tốc bao gồm các dịch vụ như chuyển phát nhanh, giao hàng qua đêm hoặc vận chuyển hàng hóa trong ngày. Dịch vụ này thường có giá trị cao hơn so với các phương thức vận chuyển khác.",
  },
];

import { FaPlane } from "react-icons/fa";
import { BsNewspaper } from "react-icons/bs";
import { MdPayment } from "react-icons/md";

export const steppersItems = [
  {
    id: 1,
    title: "Hình thức vận chuyển",
    icon: FaPlane,
  },
  {
    id: 2,
    title: "Điền thông tin đơn hàng",
    icon: BsNewspaper,
  },
  {
    id: 3,
    title: "Kiểm tra và thanh toán",
    icon: MdPayment,
  },
];

export const bonusService = [
  {
    id: 1,
    title: "Bảo hiểm hàng hóa",
    desc: "Bảo vệ bưu kiện khách hàng khỏi mất mát, hư hỏng hoặc tai nạn trong quá trình vận chuyển",
    keyServices: "bhhh",
    price: 10000,
  },
  {
    id: 2,
    title: "Dịch vụ đặc biệt",
    desc: "Các dịch vụ đặc biệt có thể bao gồm vận chuyển hàng hóa nhạy cảm, hàng lạnh, hàng nguy hiểm hoặc hàng cồng kềnh.",
    keyServices: "dvdb",
    price: 20000,
  },
  {
    id: 3,
    title: "Dịch vụ lưu trữ",
    desc: "Dịch vụ lưu trữ cho phép khách hàng yêu cầu lưu trữ hàng hóa tạm thời tại kho hàng hoặc điểm thu gom.",
    keyServices: "dvlt",
    price: 8000,
  },
  {
    id: 4,
    title: "Đóng gói và đóng kiện",
    desc: "Nếu khách hàng cần hỗ trợ trong việc đóng gói hàng hóa hoặc đóng kiện, dịch vụ này có thể được cung cấp",
    keyServices: "dgvdk",
    price: 3000,
  },
];

import logoVisa from "../assets/visa.png";
import logoMasterCard from "../assets/mastercard.png";
import logoCash from "../assets/cash.png";

export const paymentMethod = [
  {
    id: 1,
    title: "Thanh toán bằng Credit Card",
    image: [logoVisa, logoMasterCard],
    keyServices: "creditcard",
    desc: "Thẻ tín dụng Visa và Mastercard là phương thức thanh toán phổ biến. Người dùng cung cấp thông tin thẻ cho người bán và giao dịch được xử lý điện tử. Thẻ tín dụng giúp mua sắm tiện lợi, có chương trình thưởng và bảo vệ mua hàng. Tuy nhiên, cần quản lý tín dụng cẩn thận và tránh nợ quá mức. Thẻ tín dụng đã thay đổi cách thanh toán, mang lại sự linh hoạt và tiện ích cho người dùng.",
  },
  {
    id: 2,
    title: "Thanh toán bằng tiền mặt",
    image: [logoCash],
    keyServices: "cash",
    desc: "Thanh toán tiền mặt khi nhận hàng là phương thức thanh toán trực tiếp bằng tiền mặt khi nhận sản phẩm hoặc dịch vụ. Khách hàng trả tiền trực tiếp cho người bán tại thời điểm giao hàng. Phương thức này đơn giản và phổ biến, không yêu cầu sử dụng thẻ tín dụng hoặc chuyển khoản. Tuy nhiên, cần đảm bảo có đủ tiền mặt và lưu ý an toàn khi vận chuyển số tiền lớn.",
  },
];
export const statusDelivery = [
  { id: 1, name: "Chưa xác nhận", status: "unconfimred" },
  { id: 2, name: "Đã xác nhận", status: "confirmed" },
  { id: 2, name: "Chờ lấy hàng", status: "preparing" },
  { id: 2, name: "Lấy hàng thành công", status: "pickup complete" },
  { id: 2, name: "Đang vận chuyển", status: "in transit" },
  { id: 2, name: "Đã nhận hàng", status: "delivered" },
];

import chatcam from "../assets/prohibited_goods/chatcam.png";
import dechay from "../assets/prohibited_goods/dechay.png";
import doitruychongpha from "../assets/prohibited_goods/doitruychongpha.png";
import hangcam from "../assets/prohibited_goods/hangcam.png";
import hangcamtheoUPU from "../assets/prohibited_goods/hangcamtheoUPU.png";
import hangchonguoimutheoUPU from "../assets/prohibited_goods/hangchonguoimutheoUPU.png";
import kimkhiquy from "../assets/prohibited_goods/kimkhiquy.png";
import nhieudiachi from "../assets/prohibited_goods/nhieudiachi.png";
import sinhvatsong from "../assets/prohibited_goods/sinhvatsong.png";
import thutrongbuukien from "../assets/prohibited_goods/thutrongbuukien.png";
import tienthucogiatri from "../assets/prohibited_goods/tienthucogiatri.png";
import vukhi from "../assets/prohibited_goods/vukhi.png";

export const prohibitedGoods = [
  {
    id: 1,
    name: "Súng đạn, bom mìn, dao kiếm, công cụ hổ trợ",
    desc: "Vũ khí, dao các loại, đạn dược, trang thiết bị kỹ thuật quân sự, quân trang, quân dụng, trang bị quân sự khác, hiện vật thuộc di tích văn hóa lịch sử và bộ phận được tách rời của các vật này",
    image: vukhi,
  },
  {
    id: 2,
    name: "Vật hoặc chất dể nổ dễ cháy",
    desc: "Các loại vật/chất dể cháy nổ thông dụng như: bình ga, pháo các loại.",
    image: dechay,
  },
  {
    id: 3,
    name: "Văn hóa phẩm đồi trụy, phản động chống phá nhà nước",
    desc: "Các loại văn hóa phẩm đồi trụy, phản động, ấn phẩm tài liệu nhằm phá hoại trật tự công cộng chống lại Nhà nước, mê tính dị đoan, có hại tới giáo dục nhân cách, sức khỏe của trẻ em.",
    image: doitruychongpha,
  },
  {
    id: 4,
    name: "Các chất ma túy và các chất kích thích thần kinh",
    desc: "Các chất ma túy, chất kích thích thần kinh(bao gồm cả tiền chất, nguyên vật liệu chế tạo ra ma túy, chất kích thích), hóa chất có tính độc hại mạnh và thuốc lá điếu sản xuất ở nước ngoài.",
    image: chatcam,
  },
  {
    id: 5,
    name: "Các loại hàng nhà nước cấm kinh doanh hoặc nhập khẩu",
    desc: "Các loại vật phẩm hàng hóa mà Nhà nước cấm lưu thông, cấm kinh doanh, cấm nhập khẩu.",
    image: hangcam,
  },
  {
    id: 6,
    name: "Thư trong bưu kiện (Thư gửi kèm trong hàng hóa)",
    desc: "Thư trong bưu kiện (Thư gửi kèm trong hàng hóa)",
    image: thutrongbuukien,
  },
  {
    id: 7,
    name: "Sinh vật sống",
    desc: "Sinh vật sống là thực vật, động vật; động vật hoang dã, quý hiếm cần được bảo vệ (bất luận ở trạng thái nào)",
    image: sinhvatsong,
  },
  {
    id: 8,
    name: "Tiền bạc giấy tờ có giá trị",
    desc: "Tiền Việt Nam, tiền nước ngoài và các giấy tờ giá trị như tiền.",
    image: tienthucogiatri,
  },
  {
    id: 9,
    name: "Kim khí quý (vàng, bạc, đá quý)",
    desc: "Các loại kim khí quý(vàng, bạc, bạch kim...) các loại đá quý hay sản phẩm khác được chế biến từ kim khí, đá quý.",
    image: kimkhiquy,
  },
  {
    id: 10,
    name: "Bưu gửi chứa nhiều bưu gửi, gửi nhiều địa chỉ nhận",
    desc: "Bưu gửi chứa nhiều bưu gửi, gửi nhiều địa chỉ khác nhau.",
    image: nhieudiachi,
  },
  {
    id: 11,
    name: "Vật phẩm, ấn phẩm hàng cấm nhập theo thông báo LM bưu chính TG",
    desc: "Vật phẩm, ấn phẩm hàng cấm nhập vào nước nhận theo thông báo của liên minh bưu chính thế giới (UPU).",
    image: hangcamtheoUPU,
  },
  {
    id: 12,
    name: "Vật phẩm, hàng hóa trong thư, ấn phẩm, học phẩm dùng cho người mù",
    desc: "Vật phẩm, ấn phẩm hàng cấm nhập vào nước nhận theo thông báo của liên minh bưu chính thế giới (UPU)",
    image: hangchonguoimutheoUPU,
  },
];
