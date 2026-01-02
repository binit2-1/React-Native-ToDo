import { View, Text } from 'react-native'
import React, { useState } from 'react'
import TodoCapsule from '@/components/todo-capsule'

const TaskModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <View>
      <Text>TaskModal</Text>
    </View>
  )
}

export default TaskModal