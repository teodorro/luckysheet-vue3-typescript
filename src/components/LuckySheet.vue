<template>
  <div class="full-page">
    <input type="file" @change="loadExcel" accept=".xlsx" class="upload-btn" />
    <div id="luckysheet" class="sheet"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import luckysheet from 'luckysheet';
import LuckyExcel from 'luckyexcel';

const jsonData = ref({});

const myData = [
  {
    name: 'Sheet1',
    color: '',
    index: 0,
    status: 1,
    order: 0,
    celldata: [
      { r: 0, c: 0, v: { v: 'Item' } },
      { r: 0, c: 1, v: { v: 'Price' } },
      { r: 1, c: 0, v: { v: 'Apple' } },
      { r: 1, c: 1, v: { v: '1.00' } },
    ],
    config: {},
    row: 10,
    column: 10,
  },
];

onMounted(() => {
  luckysheet.create({
    container: 'luckysheet',
    showinfobar: false,
    data: myData,
  });
});

const loadExcel = (evt: any) => {
  const files = evt.target.files;
  if (files == null || files.length == 0) {
    alert('No files wait for import');
    return;
  }

  let name = files[0].name;
  let suffixArr = name.split('.'),
    suffix = suffixArr[suffixArr.length - 1];
  if (suffix != 'xlsx') {
    alert('Currently only supports the import of xlsx files');
    return;
  }
  LuckyExcel.transformExcelToLucky(
    files[0],
    function (exportJson: any, luckysheetfile: any) {
      if (exportJson.sheets == null || exportJson.sheets.length == 0) {
        alert(
          'Failed to read the content of the excel file, currently does not support xls files!'
        );
        return;
      }
      console.log('exportJson', exportJson);
      jsonData.value = exportJson;

      if (isFunction(luckysheet?.destroy)) {
        luckysheet.destroy();
      }

      luckysheet.create({
        container: 'luckysheet', //luckysheet is the container id
        showinfobar: false,
        data: exportJson.sheets,
        title: exportJson.info.name,
        userInfo: exportJson.info.name.creator,
      });
    }
  );
};

function isFunction(val: any) {
  const valType = Object.prototype.toString.call(val).slice(8, -1);
  return valType === 'Function';
}
</script>

<style scoped>
.full-page {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
}
.sheet {
  width: 100%;
  height: 100%;
}
.upload-btn {
  border: 2px solid #a00;
}
</style>
