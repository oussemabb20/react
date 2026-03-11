import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getallEvents, addEvent, editEvent, deleteEvent } from "../service/api";

const useEventStore = create(
  persist(
    (set, get) => ({
      events: [],
      errors: "",

      // --- Local state mutations ---
      populateEvents: (events) => set({ events }),

      deleteEventObject: (id) =>
        set((state) => ({
          events: state.events.filter((item) => item.id !== id),
        })),

      updateEventObject: (updatedEvent) =>
        set((state) => ({
          events: state.events.map((item) =>
            item.id === updatedEvent.id ? updatedEvent : item
          ),
        })),

      addEventObject: (event) =>
        set((state) => ({
          events: [...state.events, event],
        })),

      // --- API-backed actions ---

      // Fetch all events
      fetchEvents: async () => {
        try {
          const response = await getallEvents();
          set({ events: response.data, errors: null });
        } catch (error) {
          set({ errors: error });
        }
      },

      // Get event details by id (from store or API)
      getEventById: (id) => {
        return get().events.find((item) => String(item.id) === String(id)) || null;
      },

      // Add event via API then update store
      addEventAPI: async (eventData) => {
        const response = await addEvent(eventData);
        set((state) => ({
          events: [...state.events, response.data],
        }));
        return response.data;
      },

      // Update event via API then update store
      updateEventAPI: async (id, eventData) => {
        const response = await editEvent(id, eventData);
        set((state) => ({
          events: state.events.map((item) =>
            String(item.id) === String(id) ? response.data : item
          ),
        }));
        return response.data;
      },

      // Delete event via API then update store
      deleteEventAPI: async (id) => {
        await deleteEvent(id);
        set((state) => ({
          events: state.events.filter((item) => String(item.id) !== String(id)),
        }));
      },
    }),
    {
      name: "event-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useEventStore;