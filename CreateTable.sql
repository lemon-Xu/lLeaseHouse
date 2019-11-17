-- Lemon 
CREATE TABLE Users(
	Users_ID INT AUTO_INCREMENT COMMENT '用户ID', 
	Users_Name VARCHAR(20) NOT NULL COMMENT '用户昵称',
	Users_Account VARCHAR(20) NOT NULL COMMENT '用户账户',
	Users_PassWord VARCHAR(128) NOT NULL COMMENT '用户密码 MD5加密',
	Users_Rank VARCHAR(20) NOT NULL DEFAULT '游客' COMMENT '用户身份',
	Users_IsBan INT NOT NULL DEFAULT 0 COMMENT '被屏蔽, 1被屏蔽',
	PRIMARY KEY(Users_ID),
	UNIQUE KEY(Users_Name),
	UNIQUE KEY(Users_Account)
) AUTO_INCREMENT = 1;

INSERT INTO Users (Users_Name, Users_Account, Users_PassWord, Users_Rank) VALUES 
('管理员1', 'root',MD5('1234'), '管理员'),
('游客1', 'x1234',MD5('1234'), '游客'),
('游客2', 'x123', MD5('123'), '游客');

-- first
CREATE TABLE Landlor(
	Landlor_ID INT NOT NULL AUTO_INCREMENT COMMENT '房东ID',
	Landlor_Users_ID INT NOT NULL COMMENT '用户ID',
	Landlor_Profile VARCHAR(400) NOT NULL COMMENT '房东简介',
	Landlor_ContactInf VARCHAR(20) NOT NULL COMMENT '房东联系方式',
	Landlor_IsBan INT NOT NULL DEFAULT 0 COMMENT '被屏蔽， 1被屏蔽',
	PRIMARY KEY(Landlor_ID),
	UNIQUE KEY(Landlor_ContactInf),
	UNIQUE KEY(Landlor_Users_ID),
	FOREIGN KEY(Landlor_Users_ID) REFERENCES Users(Users_ID)
) AUTO_INCREMENT = 1;

INSERT INTO Landlor(Landlor_Users_ID, Landlor_Profile, Landlor_ContactInf) VALUES
(2, '这个房东很懒什么都没有留下', '房东神秘失踪了');

-- lemon
CREATE TABLE Administrator(
	Administrator_ID INT NOT NULL AUTO_INCREMENT COMMENT '管理员ID',
	Administrator_Users_ID INT NOT NULL COMMENT '用户ID',
	Administrator_IsBan INT NOT NULL DEFAULT 0 COMMENT '屏蔽',
	UNIQUE KEY(Administrator_Users_ID),
	PRIMARY KEY(Administrator_ID),
	FOREIGN KEY(Administrator_Users_ID) REFERENCES Users(Users_ID)
) AUTO_INCREMENT = 1;

-- Lemon
CREATE TABLE Tenant(
	Tenant_ID INT AUTO_INCREMENT COMMENT '租客ID',
	Tenant_Users_ID INT NOT NULL COMMENT '用户ID',
	Tenant_Profile VARCHAR(200) NOT NULL COMMENT '租客简介',
	Tenant_ContactInf VARCHAR(20) NOT NULL COMMENT '租客联系方式',
	Tenant_IsBan INT NOT NULL DEFAULT 0 COMMENT '屏蔽',
	PRIMARY KEY(Tenant_ID),
	UNIQUE KEY(Tenant_Users_ID),
	FOREIGN KEY(Tenant_Users_ID) REFERENCES Users(Users_ID)
) AUTO_INCREMENT = 1;

INSERT INTO Tenant(Tenant_Users_ID, Tenant_Profile, Tenant_ContactInf) VALUES
(3, '这个租客很懒什么都没有留下', '租客神秘失踪了');

-- first
CREATE TABLE House(
	House_ID INT NOT NULL AUTO_INCREMENT COMMENT '房源id，自增',
	House_Landlor_ID INT NOT NULL COMMENT '房东id',
	House_Area INT NOT NULL COMMENT '房屋面积',
	House_AreaType VARCHAR(15) NOT NULL DEFAULT '平方米' COMMENT '房屋面积类型',
	House_Profile VARCHAR(400) NOT NULL COMMENT '房屋简介，限制140字，为空则自动生成',
	House_Address VARCHAR(80) NOT NULL COMMENT '房屋地址，以-为分隔符',
	House_Headline VARCHAR(40) NOT NULL COMMENT '房屋标题',
	House_IsBan INT NOT NULL DEFAULT 0 COMMENT '被屏蔽, 1被屏蔽',
	PRIMARY KEY(House_ID),
	UNIQUE KEY(House_Address),
	FOREIGN KEY(House_Landlor_ID) REFERENCES Landlor(Landlor_ID)
) AUTO_INCREMENT = 1;

INSERT INTO House(House_Landlor_ID, House_Area, House_Profile, House_Address, House_Headline) VALUES
(1, '60', '这个房源很神秘', 'XXX路1号—XXX小区-10栋-504','XXXX大学学区房');

-- yeyu
CREATE TABLE HouseLeaseInf(
	HouseLeaseInf_ID INT  AUTO_INCREMENT COMMENT '房屋租赁ID', 
	HouseLeaseInf_House_ID INT NOT NULL COMMENT '房源ID' ,
	HouseLeaseInf_LeaseMoney INT NOT NULL COMMENT '租金金额' ,
	HouseLeaseInf_CashDeposit INT NOT NULL COMMENT '定金',
	HouseLeaseInf_ContactInf VARCHAR(20) not null COMMENT '手机号码', 
	HouseLeaseInf_OpenTime DATE NOT NULL COMMENT '公开时间',
	HouseLeaseInf_IsOpen INT NOT NULL DEFAULT 1 COMMENT '被公开， 1被公开',
	HouseLeaseInf_Mode VARCHAR(10) NOT NULL DEFAULT 'month' COMMENT '租赁方式  (year or month)',
	HouseLeaseInf_ElectronicContractTemplate VARCHAR(255) NOT NULL COMMENT '电子合同模板', 
	HouseLeaseInf_IsBan INT NOT NULL DEFAULT 0 COMMENT '被屏蔽， 1被屏蔽',
	PRIMARY KEY(HouseLeaseInf_ID),
	UNIQUE KEY(HouseLeaseInf_House_ID),
	FOREIGN KEY(HouseLeaseInf_House_ID) REFERENCES House(House_ID)
) AUTO_INCREMENT = 1;

INSERT INTO HouseLeaseInf (HouseLeaseInf_House_ID, HouseLeaseInf_LeaseMoney,HouseLeaseInf_CashDeposit, HouseLeaseInf_ContactInf, HouseLeaseInf_OpenTime, HouseLeaseInf_ElectronicContractTemplate) VALUES 
(1, '1000','400', '159xxxxxxx', '2019-11-11', '这个房东很懒没有留下模板');


-- Lemon
CREATE TABLE HouseLeaseOrderForm(
	HouseLeaseOrderForm_ID INT AUTO_INCREMENT COMMENT '房屋租赁ID',
	HouseLeaseOrderForm_House_ID INT NOT NULL COMMENT '房源ID',
	HouseLeaseOrderForm_Tenant_ID INT NOT NULL COMMENT '租客ID',
	HouseLeaseOrderForm_LeaseMoney INT NOT NULL COMMENT '租金金额',
	HouseLeaseOrderForm_StartTime DATE NOT NULL COMMENT '开始时间',
	HouseLeaseOrderForm_EndTime DATE NOT NULL COMMENT '结束时间',
	HouseLeaseOrderForm_ElectronicContract VARCHAR(225) NOT NULL COMMENT '电子合同 UUID1形式',
	HouseLeaseOrderForm_IsBan INT NOT NULL DEFAULT 0 COMMENT '被屏蔽， 1被屏蔽',
	PRIMARY KEY(HouseLeaseOrderForm_ID),
	FOREIGN KEY(HouseLeaseOrderForm_House_ID) REFERENCES House(House_ID),
	FOREIGN KEY(HouseLeaseOrderForm_Tenant_ID) REFERENCES Tenant(Tenant_ID)
) AUTO_INCREMENT = 1;

INSERT INTO HouseLeaseOrderForm(HouseLeaseOrderForm_House_ID, HouseLeaseOrderForm_Tenant_ID, HouseLeaseOrderForm_LeaseMoney, HouseLeaseOrderForm_StartTime,
HouseLeaseOrderForm_EndTime, HouseLeaseOrderForm_ElectronicContract) VALUES
(1, 1, '5000', '2018-2-1', '2018-12-1', '没有签定电子合同');
