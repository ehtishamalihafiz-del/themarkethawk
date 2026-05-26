import { useEffect, useMemo, useState } from 'react';import { useNavigate } from 'react-router-dom';import { supabase } from '../lib/supabase.js';import { currency, exportCSV, makeSlug, orderStatuses } from '../utils/helpers.js'
const blank={name:'',slug:'',category:'',image_url:'',images:'',price:'',old_price:'',product_code:'',description:'',stock_status:'In Stock'}
export default function AdminDashboard(){const nav=useNavigate();const[orders,setOrders]=useState([]);const[products,setProducts]=useState([]);const[search,setSearch]=useState('');const[form,setForm]=useState(blank);const[editId,setEditId]=useState(null)
useEffect(()=>{supabase.auth.getSession().then(({data})=>{if(!data.session)nav('/admin/login');else load()})},[])
async function load(){const o=await supabase.from('orders').select('*').order('created_at',{ascending:false});const p=await supabase.from('products').select('*').order('created_at',{ascending:false});setOrders(o.data||[]);setProducts(p.data||[])}
async function logout(){await supabase.auth.signOut();nav('/admin/login')}
async function updateStatus(id,status){await supabase.from('orders').update({status}).eq('id',id);load()}
async function delOrder(id){if(confirm('Delete this order?')){await supabase.from('orders').delete().eq('id',id);load()}}
async function saveProduct(e){e.preventDefault();
   const imageList = Array.isArray(form.images)
  ? form.images
  : form.images
    ? form.images.split('\n').map(x => x.trim()).filter(Boolean)
    : []
const data = {
  ...form,
  images: imageList,
  image_url: form.image_url || imageList[0] || '',
  slug: form.slug || makeSlug(form.name),
  price: Number(form.price),
  old_price: form.old_price ? Number(form.old_price) : null
}; if(editId) await supabase.from('products').update(data).eq('id',editId); else await supabase.from('products').insert(data); setForm(blank);setEditId(null);load()}
function editProduct(p){setEditId(p.id);setForm({...p})}
async function delProduct(id){if(confirm('Delete this product?')){await supabase.from('products').delete().eq('id',id);load()}}
const filtered=orders.filter(o=>(o.customer_name+o.phone+o.city+o.status).toLowerCase().includes(search.toLowerCase()))
const stats=useMemo(()=>({total:orders.length,pending:orders.filter(o=>o.status==='Pending').length,delivered:orders.filter(o=>o.status==='Delivered').length,sales:orders.filter(o=>o.status==='Delivered').reduce((s,o)=>s+Number(o.total_amount),0)}),[orders])
return <div className="min-h-screen bg-gray-100 p-4"><div className="mx-auto max-w-7xl"><div className="mb-5 flex items-center justify-between"><h1 className="text-3xl font-black">Admin Dashboard</h1><button onClick={logout} className="rounded-xl bg-gray-900 px-4 py-2 text-white">Logout</button></div><div className="grid gap-4 md:grid-cols-4">{[['Total Orders',stats.total],['Pending',stats.pending],['Delivered',stats.delivered],['Total Sales',currency(stats.sales)]].map(x=><div className="card p-5" key={x[0]}><p className="text-gray-500">{x[0]}</p><b className="text-2xl">{x[1]}</b></div>)}</div>
<section className="card mt-6 p-4"><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><h2 className="text-xl font-black">Orders</h2><div className="flex gap-2"><input className="input" placeholder="Search name, phone, city, status" value={search} onChange={e=>setSearch(e.target.value)}/><button className="btn whitespace-nowrap" onClick={()=>exportCSV(filtered)}>Export CSV</button></div></div><div className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b"><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th><th>Action</th></tr></thead><tbody>{filtered.map(o=><tr className="border-b align-top" key={o.id}><td className="py-3"><b>{o.customer_name}</b><br/>{o.phone}<br/>{o.city}<br/>{o.address}</td><td>{o.items?.map(i=>
  <div key={i.id}>
    {i.name} x {i.quantity}
    {i.product_code && (
      <div className="text-xs text-gray-500">
        Code: {i.product_code}
      </div>
    )}
  </div>
)}</td><td>{currency(o.total_amount)}</td><td><select className="rounded border p-2" value={o.status} onChange={e=>updateStatus(o.id,e.target.value)}>{orderStatuses.map(s=><option key={s}>{s}</option>)}</select></td><td>{new Date(o.created_at).toLocaleString()}</td><td><button onClick={()=>delOrder(o.id)} className="text-red-600">Delete</button></td></tr>)}</tbody></table></div></section>
<section className="card mt-6 p-4"><h2 className="text-xl font-black">Products</h2><form onSubmit={saveProduct} className="mt-3 grid gap-3 md:grid-cols-2"><input required className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value,slug:makeSlug(e.target.value)})}/><input className="input" placeholder="Slug" value={form.slug} onChange={e=>setForm({...form,slug:e.target.value})}/><input required className="input" placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/><input className="input" placeholder="Product Code" value={form.product_code||''} onChange={e=>setForm({...form,product_code:e.target.value})}/><input required className="input" placeholder="Image URL" value={form.image_url} onChange={e=>setForm({...form,image_url:e.target.value})}/><textarea
  className="input md:col-span-2"
  placeholder="Multiple Image URLs — one URL per line"
  value={form.images || ''}
  onChange={e=>setForm({...form,images:e.target.value})}
/><input required className="input" placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/><input className="input" placeholder="Old Price" type="number" value={form.old_price||''} onChange={e=>setForm({...form,old_price:e.target.value})}/><input className="input" placeholder="Stock Status" value={form.stock_status} onChange={e=>setForm({...form,stock_status:e.target.value})}/><textarea className="input md:col-span-2" placeholder="Description" value={form.description||''} onChange={e=>setForm({...form,description:e.target.value})}/><button className="btn md:col-span-2">{editId?'Update Product':'Add Product'}</button></form><div className="mt-5 grid gap-3 md:grid-cols-2">{products.map(p=><div className="rounded-xl border p-3" key={p.id}><b>{p.name}</b><p>{currency(p.price)} — {p.category}</p><button onClick={()=>editProduct(p)} className="mr-3 text-primary">Edit</button><button onClick={()=>delProduct(p.id)} className="text-red-600">Delete</button></div>)}</div></section></div></div>}
