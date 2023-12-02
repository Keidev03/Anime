import * as csv from 'csvtojson';

export class ConvertCSVService {

    constructor() { }

    public async CSVtoJSON(csvFile: any, key: string[]) {
        try {

            const csvBuffer = csvFile.buffer.toString('utf8'); // Chuyển đổi dữ liệu từ buffer sang chuỗi

            if (!this.IsCSV(csvBuffer)) {
                throw new Error('Uploaded file is not a CSV.');
            }

            // Chuyển đổi CSV sang JSON
            const fileJSON = await csv({
                delimiter: ';', // Sử dụng dấu chấm phẩy làm phân tách
                noheader: false, // Đối với CSV có tiêu đề
                headers: key, // Đặt tên các cột
            }).fromString(csvBuffer);

            // In JSON vào console (bạn có thể lưu vào cơ sở dữ liệu hoặc thực hiện các xử lý khác tại đây)
            console.log(fileJSON);

            // Trả về phản hồi thành công dưới dạng JSON
            return fileJSON;
        } catch (error) {
            console.log(error);
        }
    }

    private IsCSV(content: any) {
        const lines = content.split('\n');
        const firstLine = lines[0].trim();
        return firstLine.includes(';');
    }
}