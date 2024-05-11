package com.sena.riap.service;

import com.sena.riap.entities.EventData;
import com.sena.riap.entities.UserData;

import java.util.List;

public interface EventDataService {

    public List<EventData> getEventData();

    public EventData saveEventData(EventData eventData);

    public EventData getEventDataById(Long id);

    public EventData updateEventData(Long id, EventData eventData);

    public void deleteEventData(Long id);

    public List<EventData> findEventsByCourseNumber (int courseNumber);

    public EventData createEvent(EventData eventData, Integer courseNumber);

    public void deleteEvent(Long eventId, Integer courseNumber);

    public EventData getEventDataForUpdate(Long eventId);

    public EventData updateEvent(Long eventId, EventData updatedEventData, Integer courseNumber);

    public List<Integer> getAllCourseNumbers();



}
