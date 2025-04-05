
export interface ApplicationData {
  userId: string;
  userName: string;
  userNumber: string;
  classroom: string;
  applicationPurpose: string;
  applicationUseDate: string;
  applicationStart: string;
  applicationEnd: string;
  applicationDate: string;
  applicationStatus: string;
  applicationRejectReason: string | null;
  applicationUrl: string;
}

export interface ApiResponse {
  result: string;
  data: ApplicationData;
  error: string | null;
}

export const fetchApplicationData = async (applicationId: string): Promise<ApplicationData> => {
  try {
    // Updated API endpoint
    const response = await fetch(`https://itsmeweb.store/api/application/detail?applicationId=${applicationId}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const result: ApiResponse = await response.json();
    
    if (result.result !== "SUCCESS" || !result.data) {
      throw new Error(result.error || "Failed to fetch application data");
    }
    
    return result.data;
  } catch (error) {
    console.error("Error fetching application data:", error);
    throw error;
  }
};

// For development/testing purposes
export const getMockApplicationData = (): ApplicationData => {
  return {
    userId: "user1",
    userName: "홍길동",
    userNumber: "010-1111-1111",
    classroom: "전자정보대학 101",
    applicationPurpose: "회의",
    applicationUseDate: "2025-04-01",
    applicationStart: "09:00:00",
    applicationEnd: "11:00:00",
    applicationDate: "2025-03-27",
    applicationStatus: "APPROVED",
    applicationRejectReason: null,
    applicationUrl: "https://s3.url"
  };
};
