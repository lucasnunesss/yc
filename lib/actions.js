"use server"

import { auth } from "@/auth"
import { parseServerActionResponse } from "./utils"
import slugify from "slugify"
import { writeClient } from "@/sanity/lib/write-client"

export const createPitch = async (form, pitch) => {
    const session = await auth()

    if(!session) return parseServerActionResponse({error: 'Not signed in', status: 'Error'})

    const {title, description, category, link} = form;
   
      console.log("teste", form)
      const slug = slugify(title, {lower: true, strict: true})
       
      try {
        const startup = {
          title,
          description,
          category,
          image: link,
          slug: {
            _type: slug,
            current: slug
          },
          author: {
            _type: 'reference',
            _ref: session?.id
          },
          pitch
        }

        const result = await writeClient.create({_type: "startup", ...startup})

        return parseServerActionResponse({
          ...result,
          error: '',
          status: "SUCCESS"
        })
      } catch (error) {
        console.log(error)
        return parseServerActionResponse({
          error: JSON.stringify(error),
          status: "ERROR"
        })
      }

}