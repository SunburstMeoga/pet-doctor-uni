<route lang="json5" type="home">
	{
	  style: {
		navigationBarTitleText: '活动报名'
	  },
	}
	</route>
<template>
    <div class="w-full flex flex-col justify-start items-center bg-#F7F7F7 " style="min-height: 100vh;">
        <div class="w-686rpx bg-white mt-32rpx mb-28rpx rounded-24rpx overflow-hidden">
            <div class="w-full h-320rpx relative rounded-24rpx overflow-hidden">
                <div class="w-full h-full">
                    <image
                        src="http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20250219/x47TmLEdUHw17Xvhwrllxspn19C2mp1mfHUY0r3X.png"
                        mode="scaleToFill" />
                </div>
            </div>
            <div class="w-full py-28rpx pb flex justify-center items-center ">
                <div class="w-630rpx">
                    <div class="text-32rpx mb-13rpx">
                        标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题
                    </div>
                    <div class="flex justify-start items-center mb-13rpx">
                        <div class="w-32rpx h-32rpx">
                            <image
                                src="http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20250219/AqJmD9RKVekSqlDxSc2cqRev0IocoT8oPVHly4cX.png"
                                mode="scaleToFill" />
                        </div>
                        <div class="text-#8c8c8c text-24rpx ml-12rpx">2024/10/24(周三) 12:30</div>
                    </div>
                    <div class="flex justify-start items-center mb-13rpx">
                        <div class="w-32rpx h-32rpx">
                            <image
                                src="http://pet-miniapp-test.oss-cn-shenzhen.aliyuncs.com/media/20250219/UQvZuxLI8WycvKWvxBXufG4BLbGSsBoXPKQHSspS.png"
                                mode="scaleToFill" />
                        </div>
                        <div class="text-#8c8c8c text-24rpx ml-12rpx">罗湖区地王大厦C栋2405</div>
                    </div>
                    <div class="flex justify-start items-center">
                        <div class="text-#222 flex justify-start items-start">
                            <div class="font-medium text-24rpx translate-y-2rpx">￥</div>
                            <div class="ml-4rpx font-bold text-32rpx">45</div>
                        </div>
                        <div class="text-#00000073 text-24rpx ml-16rpx">X3</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-686rpx rounded-24rpx overflow-hidden flex flex-col justify-start items-center bg-white">
            <div class="w-630rpx text-#222 font-32rpx pt-28rpx">
                联系人信息
            </div>
            <div class="w-630rpx flex justify-between items-center h-96rpx"
                style="border-bottom: 0.5px solid #8c8c8c73;">
                <div class="text-#595959">姓名</div>
                <div class="flex-1">
                    <input class="text-right" ype="text" placeholder="请输入姓名">
                </div>
            </div>
            <div class="w-630rpx flex justify-between items-center h-96rpx ">
                <div class="text-#595959">手机号</div>
                <div class="flex-1">
                    <input class="text-right" type="text" placeholder="请输入手机号">
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'

</script>
<style scoped></style>