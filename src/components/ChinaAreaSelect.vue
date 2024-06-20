<template>
  <div>
    <el-form-item label="所在省">
      <el-select v-model="selectedProvince" placeholder="选择省" style="width: 240px" @change="updateCities">
        <el-option v-for="province in provinces" :key="province.value" :label="province.label" :value="province.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="所在市">
      <el-select v-model="selectedCity" placeholder="选择市" style="width: 240px">
        <el-option v-for="city in cities" :key="city.value" :label="city.label" :value="city.value" />
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import regionData from './cities.js'; // 确保路径正确

export default {
  name: 'ChinaAreaSelect',
  emits: ['update:province', 'update:city'],
  setup(props, { emit }) {
    const selectedProvince = ref('');
    const selectedCity = ref('');
    const provinces = ref([]);
    const cities = ref([]);

   // console.log('regionData:', regionData); // 打印regionData检查数据

    // 提取省份数据
    provinces.value = regionData.map(prov => ({
      value: prov.value,
      label: prov.label
    }));

    //console.log('省份数据:', provinces.value);

    const updateCities = () => {
      const selectedProv = regionData.find(prov => prov.value === selectedProvince.value);
      cities.value = selectedProv ? selectedProv.children.map(city => ({
        value: city.value,
        label: city.label
      })) : [];
      selectedCity.value = '';
      emit('update:province', selectedProv ? selectedProv.label : '');
      emit('update:city', '');
    };

    watch(selectedProvince, updateCities);
    watch(selectedCity, (newVal) => {
      const selectedProv = regionData.find(prov => prov.value === selectedProvince.value);
      const selectedCit = selectedProv ? selectedProv.children.find(city => city.value === selectedCity.value) : null;
      emit('update:city', selectedCit ? selectedCit.label : '');
    });

    return {
      selectedProvince,
      selectedCity,
      provinces,
      cities,
      updateCities
    };
  }
};
</script>