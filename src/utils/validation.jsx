import {z} from 'zod';

export const User = z.object({
    email: z.string().email({ message: "Please enter the right email." }),
    password: z.string().regex(/^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*[0-9])).{8,}$/, 
                                {message: "Password should be 8 or more characters long and include a capital letter, a lowercase letter and a digital"}),
  })