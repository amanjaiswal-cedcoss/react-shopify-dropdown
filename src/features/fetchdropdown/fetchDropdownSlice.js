import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    attributes:{},
    categories:[],
    error:{},
    selectedAttributes:[],
    status:'idle',    
};

export const fetchCategories = createAsyncThunk(
    'fetchDropdown/fetchCategories',
    async (selected) => {
    let response;
      try {  
      response=await fetch("https://multi-account.sellernext.com/home/public/connector/profile/getAllCategory/",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                appTag: "amazon_sales_channel",
                Authorization:
                  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjI5MGRiYjIzOGUyOWExYjIzMzYwY2E5Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjkzNTU0NjkwLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzMTA2NDgyYmY0ZGIyMTliZDAzMjQwMiJ9.Rxen3O-tlPcm2t1JFRo3pocZh6LL4y1dpYNBHvSggZUImTn6wo82RI-t5WxfNR78bHO8uwL-WrcPWA3CDn58rQhBqwfi0OSQaMGMPBHeiI5E--FWGYQwVJGiAXxRhPhA3LY_YyWdz4O8Ka79BDjwQFX_S8ksPAbMQbFd3M1myOvm4TYa1GHm5IK1wFLtwgLkbAOY8ClgiLB-0fahXusujEMsyLCPLCLVMNiZ0ga2JIl_jotJZwwicDtO0k9FV5OJY0GpXOPC38Zvbft8uzfOa4jrYM_fkOaBCYm_PYT6_nsNKhUcZJbM6LnICKM6hMetbvF-GHYWZv3qlCJjjLZRog",
                "Ced-Source-Id": 500,
                "Ced-Source-Name": "shopify",
                "Ced-Target-Id": 530,
                "Ced-Target-Name": "amazon",
              },
              body: JSON.stringify({
                target_marketplace:
                  "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
                user_id: "63329d7f0451c074aa0e15a8",
                selected: selected,
                target: {
                  marketplace: "amazon",
                  shopId: "530",
                },
              }),
            }
          )
        } catch (error) {
          console.log(error)
        }
          const data=await response.json()
          return data.data;
    }
  );

  export const fetchAttributes = createAsyncThunk(
    'fetchDropdown/fetchAttributes',
    async (obj) => {
        const response=await fetch("https://multi-account.sellernext.com/home/public/connector/profile/getCategoryAttributes/",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                appTag: "amazon_sales_channel",
                Authorization:
                  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjI5MGRiYjIzOGUyOWExYjIzMzYwY2E5Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjkzNTU0NjkwLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzMTA2NDgyYmY0ZGIyMTliZDAzMjQwMiJ9.Rxen3O-tlPcm2t1JFRo3pocZh6LL4y1dpYNBHvSggZUImTn6wo82RI-t5WxfNR78bHO8uwL-WrcPWA3CDn58rQhBqwfi0OSQaMGMPBHeiI5E--FWGYQwVJGiAXxRhPhA3LY_YyWdz4O8Ka79BDjwQFX_S8ksPAbMQbFd3M1myOvm4TYa1GHm5IK1wFLtwgLkbAOY8ClgiLB-0fahXusujEMsyLCPLCLVMNiZ0ga2JIl_jotJZwwicDtO0k9FV5OJY0GpXOPC38Zvbft8uzfOa4jrYM_fkOaBCYm_PYT6_nsNKhUcZJbM6LnICKM6hMetbvF-GHYWZv3qlCJjjLZRog",
                "Ced-Source-Id": 500,
                "Ced-Source-Name": "shopify",
                "Ced-Target-Id": 530,
                "Ced-Target-Name": "amazon",
              },
              body: JSON.stringify({
                target_marketplace:
                  "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
                user_id: "63329d7f0451c074aa0e15a8",
                data:{
                  barcode_exemption:false,
                  browser_node_id:obj.browseNodeId,
                  category:obj.category,
                  sub_category:obj.sub_category,
                },  
                source:{
                  marketplace: "amazon",
                  shopId: "530",
                },
                target: {
                  marketplace: "amazon",
                  shopId: "530",
                },
              }),
            }
          )
          const data=await response.json();
          let temp=Object.keys(data.data.Mandantory).map(ele=>{return {disabled:false,value:ele,label:ele}})
          return temp;
    }
  );

export const fetchDropdownSlice=createSlice({
    name:'fetchDropdown',
    initialState,
    reducers:{
      clearPrev:(state,action)=>{
        let temp=state.categories.slice(0,action.payload);
        state.categories=temp;
        state.attributes={};
        state.selectedAttributes={};
      },
      addAttribute:(state,action)=>{
        state.selectedAttributes.push(action.payload.selectedAttribute);
        state.attributes[action.payload.ind].disabled=true;
      },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchCategories.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchCategories.fulfilled, (state, action) => {
            state.status = 'idle';
            state.categories.push(action.payload);
          })
          .addCase(fetchCategories.rejected, (state, action) => {
            state.status = 'idle';
            state.error=action.payload;
          })
          .addCase(fetchAttributes.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchAttributes.fulfilled, (state,action) => {
            state.status = 'idle';
            state.attributes=action.payload;
          })
          .addCase(fetchAttributes.rejected, (state, action) => {
            state.status = 'idle';
            state.error=action.payload;
          })
    },
})

export const {clearPrev,addAttribute} =fetchDropdownSlice.actions; 

export default fetchDropdownSlice.reducer;