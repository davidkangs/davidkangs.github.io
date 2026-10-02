export const menuOptions=['소시지 구이','버섯·채소 구이','새우 구이','치킨','고기만으로 충분'];
export const statusNames:Record<string,string>={need:'구매 필요',bring:'집에서 가져오기',done:'준비 완료'};
export const baseItems=[['물',''],['고기','부위·수량은 식사 선택 후 확정'],['술','찬조 위스키와 별도로 준비할 종류 확인'],['음료수',''],['컵라면',''],['양념갈비 팩','아이들 저녁'],['짜장범벅','아이들 저녁'],['과자·간식',''],['햇반',''],['계란','다음 날 간장계란밥'],['참기름',''],['진간장',''],['장작','화로대·토치·집게 별도 확인']];
export type ShopItem={id:string;name:string;quantity:string;note:string;status:string;position:number};
export type Meal={adults:number;choices:string[];note:string};
export type CampData={items:ShopItem[];mine:Meal|null;summary:Record<string,number>;responses:number;portions:number;notes:string[]};
