# سیستم جامع تحلیل و ردیابی ماینرهای رمز ارز

## معرفی
این سیستم یک راه‌حل جامع برای تحلیل شبکه و شناسایی ماینرهای رمز ارز است که با استفاده از ASP.NET Core برای پلتفرم‌های ویندوز 10/11 x64 پیاده‌سازی شده است. این سیستم قابلیت‌های پیشرفته موقعیت‌یابی و مکان‌یابی را با استفاده از روش‌های مختلف مانند IP، MAC، GPS و تحلیل سیگنال ارائه می‌دهد.

## ویژگی‌ها
- اسکن شبکه و شناسایی دستگاه‌ها
- تشخیص ماینرهای رمز ارز با استفاده از الگوریتم‌های پیشرفته
- موقعیت‌یابی دستگاه‌ها با استفاده از روش‌های مختلف
- نمایش موقعیت دستگاه‌ها روی نقشه
- تولید گزارش‌های جامع
- رابط کاربری کلاسیک ویندوز 98

## پیاده‌سازی فنی
این سیستم با استفاده از تکنولوژی‌های زیر پیاده‌سازی شده است:
- ASP.NET Core 7.0
- Entity Framework Core
- SQL Server
- SignalR برای ارتباطات بلادرنگ
- Blazor برای رابط کاربری

## ماژول‌های موقعیت‌یابی
سیستم از چندین روش برای موقعیت‌یابی دقیق استفاده می‌کند:
1. **موقعیت‌یابی با IP**: استفاده از پایگاه داده GeoIP برای تعیین موقعیت بر اساس آدرس IP
2. **موقعیت‌یابی با GPS**: استفاده از اطلاعات GPS برای موقعیت‌یابی دقیق
3. **موقعیت‌یابی با MAC**: تطبیق آدرس MAC با پایگاه داده دستگاه‌ها
4. **موقعیت‌یابی با سیگنال**: تحلیل قدرت سیگنال برای تخمین فاصله و موقعیت

## منابع داده
سیستم از منابع داده زیر برای تصدیق و تکمیل اطلاعات استفاده می‌کند:
- MaxMind GeoIP Database
- Google Maps Geolocation API
- OpenStreetMap
- WiGLE Wi-Fi Database

## نیازمندی‌های سیستم
- ویندوز 10/11 x64
- .NET 7.0 SDK
- SQL Server 2019 یا بالاتر
- حداقل 8GB RAM
- حداقل 100GB فضای دیسک

## نصب و راه‌اندازی
1. نصب .NET 7.0 SDK
2. نصب SQL Server
3. اجرای اسکریپت‌های پایگاه داده
4. تنظیم فایل appsettings.json
5. اجرای برنامه با دستور `dotnet run`

## مستندات API
API های سیستم با استفاده از Swagger مستندسازی شده‌اند و در آدرس زیر قابل دسترسی هستند:
`https://localhost:5001/swagger`

