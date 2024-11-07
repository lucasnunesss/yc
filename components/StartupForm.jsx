"use client"
import { useActionState, useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import MDEditor from '@uiw/react-md-editor'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
const StartupForm = () => {
  const [errors, setErrors] = useState({})
  const [pitch, setPitch] = useState("")
  const form = useForm({
    defaultValues: {
      title: ""
    }
  });
  const {register, handleSubmit, formState} = form
  const {errors: error} = formState
  const handleFormSubmit = (data) => {
      console.log(data)
  }

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL"
  })


  console.log("erro no titulo", error.title)
  return (
   <form onSubmit={handleSubmit(handleFormSubmit)} className='startup-form'>
      <div>
        <label htmlFor="title" className='startup-form_label'>Title</label>
        <Input id="title" name="title" className="startup-form_input" required placeholder="Startup Title" {...register("title", {
          required: true,
          minLength: {
            value: 3,
          },
          maxLength: 100,
        })} />

        {error.title && <p className='startup-form_error'>123453355353</p>}
      </div>

      <div>
        <label htmlFor="description" className='startup-form_label'>Description</label>
        <Textarea id="description" name="description" className="startup-form_textarea" required placeholder="Startup Description" />

        {errors.description && <p className='startup-form_error'>{errors.description}</p>}
      </div>


      <div>
        <label htmlFor="category" className='startup-form_label'>Category</label>
        <Input id="category" name="category" className="startup-form_input" required placeholder="Startup Category (Tech, Health, Education...)" />

        {errors.category && <p className='startup-form_error'>{errors.category}</p>}
      </div>


      <div>
        <label htmlFor="link" className='startup-form_label'>Image URL</label>
        <Input id="link" name="link" className="startup-form_input" required placeholder="Startup Image URL" />

        {errors.link && <p className='startup-form_error'>{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className='startup-form_label'>Pitch</label>
        <MDEditor value={pitch} onChange={(value) => setPitch(value)}
            id='pitch'
            preview='edit'
            height={300}
            style={{borderRadius: 20, overflow: "hidden"}}
            textareaProps={{
              placeholder: "Briefly describe your idea and what problem it solves"
            }}
            previewOptions={{
              disallowedElements: ["style"]
            }}
        />

        {errors.pitch && <p className='startup-form_error'>{errors.pitch}</p>}
      </div>

      <Button type="submit" className="startup-form_btn text-white" disabled={isPending} >
        {isPending ? 'Submitting...' : 'Submit your pitch'}
            <Send className='size-6 ml-2' />
      </Button>
   </form>
  )
}

export default StartupForm