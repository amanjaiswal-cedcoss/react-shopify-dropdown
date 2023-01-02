import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
    attributes:{},
    categories:[],
    error:'',
    selectedAttributes:[],
    status:'idle',  
    targetAttribute:{},  
};

// Async thunk to fetch the required categories from API
export const fetchCategories = createAsyncThunk(
    'fetchDropdown/fetchCategories',
    async (selected,thunk) => {
     let response= await fetch("https://multi-account.sellernext.com/home/public/connector/profile/getAllCategory/",
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
           // error handling for failure response from API
          .catch(err=>{console.log(err);return thunk.rejectWithValue(err.message)})
          let data={};
          try{data= await response.json();}
          catch(err){console.log(err);return thunk.rejectWithValue(err)} 

          if(data.success){
          return data.data;
          }
          else{
            return thunk.rejectWithValue(data)
          }
          
    }
  );

// Async thunk to fetch the required attributes of a leaf-category from API
  export const fetchAttributes = createAsyncThunk(
    'fetchDropdown/fetchAttributes',
    async (obj,thunk) => {
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
          // error handling for failure response from API
          .catch(err=>{return thunk.rejectWithValue(err.message)})
          let data={};
          try{data= await response.json();}
          catch(err){return thunk.rejectWithValue(err)} 

          if(data.success){
            let temp=Object.keys(data.data.Mandantory).map(ele=>{return {disabled:false,value:ele,label:ele}})
            return temp;
          }
          else{
            return thunk.rejectWithValue(data)
          }
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
        state.selectedAttributes=[];
      },
      addAttribute:(state,action)=>{
        state.targetAttribute={attribute:action.payload,value:''}
      },
      saveAttribute:(state,action)=>{
        state.selectedAttributes.push({attribute:action.payload.name,value:action.payload.value});
      },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchCategories.pending, (state) => {
            state.status = 'loading';
            state.error='';
          })
          .addCase(fetchCategories.fulfilled, (state, action) => {
            state.status = 'idle';
            state.categories.push(action.payload);
          })
          .addCase(fetchCategories.rejected, (state, action) => {
            console.log(action)
            state.status = 'idle';
            state.error=action.payload.message;
          })
          .addCase(fetchAttributes.pending, (state) => {
            state.selectedAttributes=[];
            state.attributes={}
            state.status = 'loading';
            state.error=''
          })
          .addCase(fetchAttributes.fulfilled, (state,action) => {
            state.status = 'idle';
            state.attributes=action.payload;
          })
          .addCase(fetchAttributes.rejected, (state, action) => {
            console.log(action)
            state.status = 'idle';
            state.error=action.payload.message;
          })
    },
})

export const {clearPrev,addAttribute,saveAttribute} =fetchDropdownSlice.actions; 

export default fetchDropdownSlice.reducer;