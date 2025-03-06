export interface UserInfo {
	/** 用户名 */
	username: string;
	/** 头像URL */
	avatarUrl: string | null;
	/** 是否管理员 */
	isAdmin: boolean;
	/** 手机号 */
	phone: string;
}
