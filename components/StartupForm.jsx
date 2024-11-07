"use client"
import { useActionState, useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import MDEditor from '@uiw/react-md-editor'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
import {  useForm } from 'react-hook-form'
import { isValidUrl, warningMsg } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
const StartupForm = () => {
  const router = useRouter()
  const [pitch, setPitch] = useState("")
  const {toast} = useToast()
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      link: "",
      pitchForm: ""
    }
  });

  
  const {register, handleSubmit, formState, getValues, reset} = form
  const {errors: errorState, isSubmitSuccessful} = formState


  const [errors, setErrors] = useState({
    
  })
  const handleFormSubmit = async(data) => {
     try {
        const formValues = {
          title: getValues("title"),
          description: getValues("description"),
          category: getValues("category"),
          link: getValues("link"),
        }

        console.log("Post bem sucedido", formValues)
      
     } catch (error) {

     } finally {

     }

  
  }

  useEffect(() => {
    if(isSubmitSuccessful){
      reset()
      setPitch("")
    }
  }, [isSubmitSuccessful, reset])

  // Por enquanto não vou usar isso
  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL"
  })

  if(errorState.title){
    toast({
      title: "Error",
      description: "bla bla bla",
      variant: "destructive"
    })
  }
  return (
   <form onSubmit={handleSubmit(handleFormSubmit)} className='startup-form'>
      <div>
        <label htmlFor="title" className='startup-form_label'>Title</label>
        <Input id="title" name="title" className="startup-form_input" required placeholder="Startup Title" {...register("title", {
          required: true,
          minLength: {
            value: 3,
            message: warningMsg("Title", true, false)
          },

          maxLength: {
            value: 100,
            message: warningMsg("Title", false, true)
          },
        })} />

        {errorState?.title && <p className='startup-form_error'>{errorState.title?.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className='startup-form_label'>Description</label>
        <Textarea id="description" name="description" className="startup-form_textarea" required placeholder="Startup Description" {...register("description", {
          required: true,
            minLength: {
              value: 20,
              message: warningMsg("Description", true, false)
            },
            maxLength: {
              value: 500,
              message: warningMsg("Description", false, true)
            }
        })} />

        {errorState?.description && <p className='startup-form_error'>{errorState?.description?.message}</p>}
      </div>


      <div>
        <label htmlFor="category" className='startup-form_label'>Category</label>
        <Input id="category" name="category" className="startup-form_input" required placeholder="Startup Category (Tech, Health, Education...)" 
          {...register("category", {
            required: true,
            minLength: {
              value: 3,
              message: warningMsg("Category", true, false)
            },
            maxLength: {
              value: 20,
              message: warningMsg("Category", false, true)
            }
          })}
        />

        {errorState?.category && <p className='startup-form_error'>{errorState?.category?.message}</p>}
      </div>


      <div>
        <label htmlFor="link" className='startup-form_label'>Image URL</label>
        <Input id="link" name="link" className="startup-form_input" required placeholder="Startup Image URL" {...register("link", {
          validate: async(result) => {
              if(isValidUrl(result) === false){
                return "This is not an image"
              }
              
              try {
                const res = await fetch(result)
                const constentType = res?.headers?.get("content-type");
                if(!constentType?.startsWith('image/')){
                    return "This is not an image"
                }
              } catch (error) {
                  return "This is not an image"
              }
    
          } 
        })} />

        {errorState?.link && <p className='startup-form_error'>{errorState?.link?.message}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className='startup-form_label'>Pitch</label>
        <MDEditor  value={pitch} onChange={(value) => setPitch(value)}
            id='pitch'
            preview='edit'
            height={300}
            style={{borderRadius: 20, overflow: "hidden"}}
            textareaProps={{
              placeholder: "Briefly describe your idea and what problem it solves",
              minLength: 10
            }}
            previewOptions={{
              disallowedElements: ["style"]
            }}

   
            
        />

        {errorState?.pitchForm && <p className='startup-form_error'>{errorState?.pitchForm?.message}</p>}
      </div>

      <Button type="submit" className="startup-form_btn text-white"  >
        {isPending ? 'Submitting...' : 'Submit your pitch'}
            <Send className='size-6 ml-2' />
      </Button>
   </form>
  )
}

export default StartupForm