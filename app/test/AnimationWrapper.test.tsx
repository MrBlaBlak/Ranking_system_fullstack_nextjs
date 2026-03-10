import {it, expect, describe} from 'vitest'
import {render, screen} from '@testing-library/react'
import AnimationWrapper from "@/app/components/AnimationWrapper";
describe('AnimationWrapper', () =>{
    it('should render motion div when isClient and !isModalOpen', () =>{
        render(<AnimationWrapper/>)
        screen.debug();
    })
})